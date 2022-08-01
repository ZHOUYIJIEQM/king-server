module.exports = (app) => {
  const express = require("express");
  const path = require("path");
  const jwt = require("jsonwebtoken");
  const inflection = require("inflection");
  const bcryptjs = require("bcryptjs");
  const allModel = require("require-all")(
    path.join(__dirname, "..", "..", "models")
  );

  // 登录校验
  const auth = require('../../middleWare/validate.js')
  // 权限校验
  const { authority } = require('../../middleWare/access.js')

  // 登录接口
  app.post("/admin/api/login", async (req, res, next) => {
    const { username, password } = req.body;
    if (!(username || password)) {
      res.status(422).send({
        message: "请输入用户名和密码!",
      });
      return next();
    }

    // 查询用户是否存在
    const user = await allModel.AdminUser.findOne({ username }).select(
      "+password"
    );
    if (!user) {
      res.status(422).send({
        message: "用户名不存在!",
      });
      return next();
    }

    // 校验密码是否正确
    const isValid = bcryptjs.compareSync(password, user.password);
    if (!isValid) {
      res.status(422).send({
        message: "密码错误!",
      });
      return next();
    }

    // 返回token
    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send({
      message: "登陆成功",
      token,
    });
  });

  // 通用接口
  const commonRouter = express.Router();
  app.use(
    "/admin/api/resource/:resource",
    auth(app),
    async (req, res, next) => {
      // inflection.classify('message_bus_properties');
      // 'MessageBusProperty'
      // 得到 mongo 集合名
      // const modelName = inflection.classify(req.params.resource)
      // req.Model = allModel[modelName]
      // console.log(req.Model === require(`../../models/${modelName}`)); // true
      // req.modelName = inflection.classify(req.params.resource);
      req.modelName = req.params.resource.at(0).toUpperCase()+req.params.resource.slice(1)
      next();
    },
    commonRouter
  );

  // 获取对应模块列表数据
  commonRouter.get(
    "/",
    // 处理有页数,条目数
    async (req, res, next) => {
      // 没有页数或条目数, 跳到下一个处理函数
      if (!(req.query.pageNum || req.query.pageSize)) {
        return next();
      }
      const { pageNum = 1, pageSize = 5 } = req.query
      const skipNum = (pageNum - 1) * pageSize
      const total = await allModel[req.modelName].countDocuments()
      let data = null
      if (req.query.name) {
        data = await allModel[req.modelName].find({ name: req.query.name })
          .skip(skipNum)
          .limit(pageSize)
          .populate({path: 'cate', options: {strictPopulate: false}})
          // .populate("cate")
        } else {
          data = await allModel[req.modelName].find()
          .skip(skipNum)
          .limit(pageSize)
          .populate({path: 'cate', options: {strictPopulate: false}})
      }
      res.send({
        total, data
      })
    },
    async (req, res) => {
      // 分类
      if (req.modelName === "Category") {
        const allCate = await allModel[req.modelName].find({}).select('-__v').lean()
        const cateTree = allCate.filter(i => i.parent === null)
        
        /**
         * 改成树状结果
         * @param {array} cateArr 第一层分类
         * @param {array} cateList 所有的分类
         */
        const getTree = (cateArr, cateList) => {
          if (cateArr.length) {
            for (let index = 0; index < cateArr.length; index++) {
              let item = cateArr[index];
              let child = cateList.filter(item1 => {
                if (item1.parent) {
                  return item._id.toString() === item1.parent.toString()
                }
              })
              if (child.length) {
                item.children = child
                getTree(child, cateList)
              }
            }
          }
        }
        getTree(cateTree, allCate)
        
        // console.log('树', cateTree);

        res.send(cateTree)
      }

      // 
      if (req.modelName === "Hero") {
        
      }
      
      // 文章
      if (req.modelName === "Article") {
        
      }
      
      
    }
  );

  // 新建
  commonRouter.post(
    "/",
    authority(),
    async (req, res) => {
      try {
        // const model = await allModel[req.modelName].create(req.body)
        if (!req.body.name) {
          return res.status(400).send({ message: "传入参数有误!" })
        }
        await allModel[req.modelName].insertMany([ req.body ])
        res.send({message: '新建成功!'})
      } catch (error) {
        return res.status(400).send({ message: "传入参数有误!" })
      }
    }
  );

  // 通过 id 查找
  commonRouter.get(
    "/:id",
    async (req, res) => {
      try {
        const model = await allModel[req.modelName].findById(req.params.id)
        res.send(model)
      } catch (error) {
        console.log('通过 id 查找错误!');
        return res.status(403).send({ message: '操作有误!' })
      }
    }
  )

  // 更新数据
  commonRouter.put(
    "/:id",
    authority(),
    async (req, res) => {
      try {
        const model = await allModel[req.modelName].findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
      } catch (error) {
        console.log('更新数据错误!');
        return res.status(403).send({ message: '参数有误!' })
      }
    }
  )

  // 删除
  commonRouter.delete(
    "/:id",
    authority(),
    async (req, res) => {
      if (req.modelName === "Category") {
        // 不能删除有子分类的分类项
        const cate = await allModel[req.modelName].findById(req.params.id)
        const children = await allModel[req.modelName].find({ parent: cate._id })
        if (children.length) {
          return res.status(403).send({ message: '无法删除有子分类的分类!' })
        }
      }
      
      await allModel[req.modelName].findByIdAndDelete(req.params.id);
      res.send({ message: "删除成功!" })
    }
  )

};