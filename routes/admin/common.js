// 资源请求, 通用接口
const express = require("express");
const allModel = require("require-all")(require("path").join(__dirname, "..", "..", "models"));
const validate = require("../../middleWare/validate");
const access = require("../../middleWare/access");

module.exports = async (app) => {
  const commonRouter = express.Router();
  // 通用接口都需要处理
  app.use(
    "/admin/api/resource/:resource",
    validate(app),
    async (req, res, next) => {
      // 模块名首字母大写
      req.modelName = req.params.resource.at(0).toUpperCase()+req.params.resource.slice(1);
      // req.modelName = req.params.resource.replace(/^(.)(.*?)$/ig, (match, p1, p2) => p1.toUpperCase() + p2);
      next();
    },
    commonRouter
  ) 
  
  // 获取对应模块列表数据
  commonRouter.get(
    "/",
    async (req, res) => {
      try {
        // 处理请求参数有 pageNum pageSize
        if (req.query.pageNum && req.query.pageSize) {
          const { pageNum, pageSize } = req.query;
          const skipNum = (pageNum - 1) * pageSize;
          const total = await allModel[req.modelName].countDocuments();
          let query = allModel[req.modelName].find();
          
          // 如果存在排序项
          if (req.query?.sortItem?.length && req.query?.orderType?.length) {
            let sortItem = req.query.sortItem;
            let orderType = req.query.orderType === 'ascending' ? 1 : -1;
            query = query.sort({ [sortItem]: orderType });
          }

          // 需要聚合分类
          if (["Article", "Strategy"].includes(req.modelName)) {
            let data = await query.select("-content -__v")
              .populate({ path: "category", select: "-_id name" })
              .skip(skipNum).limit(pageSize).lean();
            // 把分类提取为用 / 拼接的字符串
            data = data.map(item => {
              item.category = item.category.map(i => i.name).join(' / ')
              return item
            });
            return res.send({ data, total })
          }
          
          if (["Hero"].includes(req.modelName)) {
            let data = await query.select("name nickname category avatar scores")
              .populate({ path: "category", select: "name" })
              .skip(skipNum).limit(pageSize).lean();
            data = data.map(item => {
              item.category = item.category.map(i => i.name).join(' / ')
              return item
            });
            return res.send({ data, total })
          }

          // 不需处理, 直接查询并返回
          const data = await query.skip(skipNum).limit(pageSize);
          return res.send({ total, data });
        } else {
          // 如果req.modelName为分类, 把扁平数组转为树形数组
          let data = await allModel[req.modelName].find().select('-__v').lean();
          if (req.modelName === 'Category') {
            // 扁平数组转为树形数组
            const arrayToTree = (originArr, pid) => {
              const treeArr = []
              const getChildren = (originArr, parentItem, pid) => {
                for (const item of originArr) {
                  // note: 有坑, new ObjectId("63725f52ded8e1d0f68370fb") === new ObjectId("63725f52ded8e1d0f68370fb") // false
                  if ((item.parent && item.parent.toString()) === (pid && pid.toString())) {
                    const newItem = {...item, children: []}
                    parentItem.push(newItem)
                    getChildren(originArr, newItem.children, item._id)
                  }
                }
              }
              getChildren(originArr, treeArr, pid)
              return treeArr
            }
            data = arrayToTree(data, null)
          }
          return res.send(data);
        }
      } catch (error) {
        console.log(error);
        res.status(400).send({ message: `${req.path}: ${error.message}` })
      }
    }
  )

  // 添加, 需管理员权限
  commonRouter.post(
    "/",
    access(),
    async (req, res) => {
      try {
        await allModel[req.modelName].insertMany([ req.body ])
        res.send({ message: "添加成功!" })
      } catch (error) {
        console.log(error);
        res.status(400).send({ message: `${req.path}: ${error.message}` })
      }
    }
  )

  // 根据id查找
  commonRouter.get(
    "/:id",
    async (req, res) => {
      try {
        let data = null;
        if (["Hero"].includes(req.modelName)) {
          let result = {}
          if (req.params.id !== 'undefined') {
            data = await allModel[req.modelName].findById(req.params.id).select("-__v")
              .populate({ path: "category", select: "_id" })
              .populate({ path: "inscriptionId", select: "_id" })
              .populate({ path: "summonersId", select: "_id" })
              .populate({ path: "equipment.downWind", select: "_id" })
              .populate({ path: "equipment.upWind", select: "_id" }).lean()
              // .populate({ path: "relations.relation.hero", select: "_id name" })
            // 分类只提取 _id 组成的数组
            data.equipment.downWind = data.equipment.downWind.map(i => i._id)
            data.equipment.upWind = data.equipment.upWind.map(i => i._id)
            data.category = data.category.map(i => i._id)
            data.summonersId = data.summonersId.map(i => i._id)
            data.inscriptionId = data.inscriptionId.map(i => i._id)
            result.data = data
          }

          let parent = await allModel.Category.findOne({ name: '英雄列表' })
          let category = await allModel.Category.find({ parent: parent.id }).select("_id name")
          result.category = category
          // let inscription = await allModel.Inscription.find().sort({ grade: 1 }).select("_id name desc")
          // let summoner = await allModel.Summoner.find().sort({ rank: 1 }).select("_id name description")

          return res.send(result)
        }
        
        if (["Article"].includes(req.modelName)) {
          data = await allModel[req.modelName].findById(req.params.id)
            .populate({ path: "category", select: "_id name" })
          data.category = data.category.map(i => i._id)
          return res.send(data);
        }

      } catch (error) {
        console.log(error);
        res.status(400).send({ message: `${req.path}: ${error.message}` })
      }
    }
  )

  // 通过名称搜索
  commonRouter.post(
    "/search",
    async (req, res, next) => {
      try {
        // if (!req.body.pageNum || !req.body.pageSize) { throw new Error("传入参数错误!") }
        if (!req.body.pageNum || !req.body.pageSize) { return next() }
        const { pageNum, pageSize } = req.body;
        const skipNum = (pageNum - 1) * pageSize;

        let sortObj = {}
        let queryObj = { name: new RegExp(req.body.name, "ig") }
        if (req.body?.sortItem?.length) {
          const sortItem = req.body.sortItem;
          const orderType = req.body.orderType === 'ascending' ? 1 : -1;
          sortObj[sortItem] = orderType;
        }

        if (["Items", "Inscription", "Summoner"].includes(req.modelName)) {
          total = await allModel[req.modelName].find(queryObj).count();
          data = await allModel[req.modelName].find(queryObj).sort(sortObj).skip(skipNum).limit(pageSize);
        }

        if (["AdminUser"].includes(req.modelName)) {
          queryObj = { userName: new RegExp(req.body.name, "ig") }
          total = await allModel[req.modelName].find(queryObj).count();
          data = await allModel[req.modelName].find(queryObj).sort(sortObj).skip(skipNum).limit(pageSize);
        }

        if (["Article"].includes(req.modelName)) {
          total = await allModel[req.modelName].find(queryObj).count();
          data = await allModel[req.modelName].find(queryObj).select("-content -__v").populate({ path: "category", select: "-_id name" }).sort(sortObj).skip(skipNum).limit(pageSize).lean();
          data = data.map(item => {
            item.category = item.category.map(i => i.name).join(' / ')
            return item
          });
        }

        if (["Hero"].includes(req.modelName)) {
          total = await allModel[req.modelName].find(queryObj).count();
          data = await allModel[req.modelName].find(queryObj).select("-__v").populate({ path: "category", select: "-_id name" }).sort(sortObj).skip(skipNum).limit(pageSize).lean();
          data = data.map(item => {
            item.category = item.category.map(i => i.name).join(' / ')
            return item
          });
        }

        return res.send({ data, total });
      } catch (error) {
        console.log(error);
        res.status(400).send({ message: `${req.path}: ${error.message}` })
      }
    },
    async (req, res) => {
      if (["Category"].includes(req.modelName)) {
        let data = await allModel[req.modelName].find({ name: new RegExp(req.body.name, "ig") })
        return res.send(data)
      }
    }
  )

  // 根据id更新数据, 需管理员权限
  commonRouter.put(
    "/:id",
    access(),
    async (req, res) => {
      try {
        await allModel[req.modelName].findByIdAndUpdate(req.params.id, req.body)
        // console.log(req.params.id, req.body);
        return res.send({ message: "更新成功!" })
      } catch (error) {
        console.log(error);
        res.status(400).send({ message: `${req.path}: ${error.message}` })
      }
    }
  )

  // 根据id删除, 需管理员权限
  commonRouter.delete(
    "/:id",
    access(),
    async (req, res) => {
      try {
        if (req.modelName === "Category") {
          // 不能删除有子分类的分类项
          const cate = await allModel[req.modelName].findById(req.params.id)
          const children = await allModel[req.modelName].find({ parent: cate._id })
          if (children.length) {
            return res.status(403).send({ message: '无法删除有子分类的分类!' })
          }
        }
        await allModel[req.modelName].findByIdAndDelete(req.params.id);
        return res.send({ message: "删除成功!" })
      } catch (error) {
        console.log(error);
        res.status(400).send({ message: `${req.path}: ${error.message}` })
      }
    }
  )
}