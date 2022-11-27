module.exports = async (app) => {
  const express = require("express");
  const path = require("path");
  const allModel = require("require-all")(path.join(__dirname, "..", "..", "models"));
  
  // 首页
  const homeRouter = express.Router();
  app.use("/web/api/home", homeRouter);

  // 首页轮播
  homeRouter.get("/ads", async (req, res) => {
    try {
      const data = await allModel.Ad.findOne({ name: "首页轮播图" }, { _id: 0, __v: 0, 'items._id': 0 })
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: `${req.path}: ${error.message}` })
    }
  });

  // 新闻资讯
  homeRouter.get("/shortNews", async (req, res) => {
    try {
      let newsId = (await allModel.Category.findOne({ name: "新闻资讯" }))._id;
      
      // 聚合查询
      // let newsData = await allModel.Category.aggregate([
      //   {
      //     $lookup: {
      //       from: "Article",
      //       localField: "_id",
      //       foreignField: "category",
      //       as: "dataList",
      //     },
      //   },
      //   { $match: { parent: newsId } },
      //   {
      //     $project: {
      //       name: 1,
      //       dataList: { $slice: [ "$dataList", 5 ] },
      //     },
      //   },
      // ]);

      // find查询
      const childCate = await allModel.Category.find({ parent: newsId })
      const childCateIds = childCate.map(i => ({name: i.name, _id: i._id}))
      let newsData = []
      for (const item of childCateIds) {
        // const dataList = await allModel.Article
        //   .find({
        //     category: { $in: item._id }
        //   })
        //   .select("name _id createdTime")
        //   .limit(5).lean()
        const dataList = await allModel.Article
          .find()
          .where('category').in(item._id)
          .select("name _id createdTime")
          .limit(5).lean()
        newsData.push({
          name: item.name,
          dataList
        })
      }
      res.send(newsData);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: `${req.path}: ${error.message}` })
    }
  });

  // 英雄列表轮播
  homeRouter.get("/heroListBanner", async (req, res) => {
    try {
      res.send(await allModel.Ad.findOne({ name: "英雄列表" }, { _id: 0, __v: 0, 'items._id': 0 }));
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: `${req.path}: ${error.message}` })
    }
  });

  // 英雄列表
  homeRouter.get("/heroList", async (req, res) => {
    try {
      let heroListId = (await allModel.Category.findOne({ name: "英雄列表" }))._id;
      let data = await allModel.Category.aggregate([
        { $match: { parent: heroListId } },
        { 
          $lookup: {
            from: "Hero",
            localField: "_id",
            foreignField: "category",
            as: "dataList",
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            "dataList.name": 1,
            "dataList.avatar": 1,
            "dataList.ename": 1,
          },
        },
      ]);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: `${req.path}: ${error.message}` })
    }
  });

  // 精彩视频
  homeRouter.get("/highlightVdo", async (req, res) => {
    try {
      const pid = (await allModel.Category.findOne({ name: "精品栏目" }))._id;
      let data = await allModel.Category.aggregate([
        { $match: { parent: pid } },
        {
          $lookup: {
            from: "Strategy",
            localField: "_id",
            foreignField: "category",
            as: "dataList",
          },
        },
        { $project: { "dataList.cate": 0, "dataList.heros": 0, "dataList.__v": 0, "dataList._id": 0, }, },
      ]);
      data = data[0].dataList.sort(() => Math.random() - 0.5);
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: `${req.path}: ${error.message}` })
    }
  })

}
