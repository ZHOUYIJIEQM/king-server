module.exports = async (app) => {
  const express = require("express");
  const path = require("path");
  const allModel = require("require-all")(path.join(__dirname, "..", "..", "models"));
  
  // 攻略
  const strategyRouter = express.Router();
  app.use("/web/api/strategy", strategyRouter);
  
  // 轮播
  strategyRouter.get("/banner", async (req, res) => {
    try {
      res.send(await allModel.Ad.findOne({ name: "攻略中心轮播图" }, { _id: 0, __v: 0 }));
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: `${req.path}: ${error.message}` })
    }
  });

  // 所有攻略内容
  strategyRouter.get("/allStrategy", async (req, res) => {
    try {
      let matchItem = [ "热门视频", "精品栏目", "赛事精品", "精彩视频" ];
      let data = [];
      for (const item of matchItem) {
        let d = await allModel.Category.aggregate([
          { $match: { parent: (await allModel.Category.findOne({ name: item }))._id } },
          {
            $lookup: {
              from: "Strategy",
              localField: "_id",
              foreignField: "category",
              as: "dataList",
            },
          },
        ]);
        data.push({ name: item, dataList: d })
      }
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: `${req.path}: ${error.message}` })
    }
  });

  // 根据传入英雄名称获取英雄攻略
  strategyRouter.post("/heroStrategy", async (req, res) => {
    try {
      const { name } = req.body;
      let data = {
        vdo: [],
        article: [],
      };
      let strategy = await allModel.Strategy.find({ heros: name }, { content: 0, cate: 0 });
      if (strategy.length) {
        for (const item of strategy) {
          if (item.vdoId.length) {
            data.vdo.push(item);
          } else {
            data.article.push(item);
          }
        }
      }
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: `${req.path}: ${error.message}` })
    }
  });
  
}