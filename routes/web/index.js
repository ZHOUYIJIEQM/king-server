module.exports = (app) => {
  const mongoose = require("mongoose");
  const express = require("express");
  const path = require("path");
  const allModel = require("require-all")(
    path.join(__dirname, "..", "..", "models")
  );

  // 首页
  const homeRouter = express.Router();
  app.use("/web/api/home", homeRouter);

  // 首页轮播
  homeRouter.get("/ads", async (req, res) => {
    res.send(
      await allModel.Ad.findOne({ name: "首页轮播图" }, { _id: 0, __v: 0 })
    );
  });

  // 新闻资讯
  homeRouter.get("/shortNews", async (req, res) => {
    let newsId = (await allModel.Category.findOne({ name: "新闻资讯" })).id;
    let newsData = await allModel.Category.aggregate([
      {
        $lookup: {
          from: "Article",
          localField: "_id",
          foreignField: "cate",
          as: "dataList",
        },
      },
      {
        $match: {
          parent: mongoose.Types.ObjectId(newsId),
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          dataList: { $slice: ["$dataList", 5] },
        },
      },
    ]);

    // 筛选数组长度大于 110
    // let gt = newsData.filter(i => {
    //   return i.dataList.length>110
    // })
    // console.log('数组长度大于110', gt);

    // console.log('新闻资讯', newsData);
    res.send(newsData);
  });

  // 英雄列表轮播
  homeRouter.get("/heroListBanner", async (req, res) => {
    res.send(
      await allModel.Ad.findOne({ name: "英雄列表" }, { _id: 0, __v: 0 })
    );
  });

  // 英雄列表
  homeRouter.get("/heroList", async (req, res) => {
    let heroListId = (await allModel.Category.findOne({ name: "英雄列表" })).id;
    // console.log(heroListId);
    let data = await allModel.Category.aggregate([
      {
        $match: {
          parent: mongoose.Types.ObjectId(heroListId),
        },
      },
      {
        $lookup: {
          from: "Hero",
          localField: "_id",
          foreignField: "cate",
          as: "dataList",
        },
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
    // console.log('英雄列表', data);
    res.send(data);
  });

  // 精彩视频
  homeRouter.get("/highlightVdo", async (req, res) => {
    let pid = (await allModel.Category.findOne({ name: "精品栏目" })).id;
    // console.log('精品栏目', pid);
    let data = await allModel.Category.aggregate([
      {
        $match: {
          parent: mongoose.Types.ObjectId(pid),
        },
      },
      {
        $lookup: {
          from: "Strategy",
          localField: "_id",
          foreignField: "cate",
          as: "dataList",
        },
      },
      {
        $project: {
          "dataList.cate": 0,
          "dataList.heros": 0,
          "dataList.__v": 0,
          "dataList._id": 0,
        },
      },
    ]);
    // console.log('首页精彩视频', data);
    data = data[0].dataList.sort(() => Math.random() - 0.5);
    res.send(data);
  });

  // 攻略中心
  const strategyRouter = express.Router();
  app.use("/web/api/strategy", strategyRouter);

  // 轮播
  strategyRouter.get("/banner", async (req, res) => {
    res.send(
      await allModel.Ad.findOne({ name: "攻略中心轮播图" }, { _id: 0, __v: 0 })
    );
  });

  // 所有攻略内容
  strategyRouter.get("/allStrategy", async (req, res) => {
    let matchItem = [
      "热门视频",
      "英雄攻略",
      "精品栏目",
      "赛事精品",
      "精彩视频",
    ];
    let data = [];
    for (const item of matchItem) {
      let d = await allModel.Category.aggregate([
        {
          $match: {
            parent: mongoose.Types.ObjectId(
              (
                await allModel.Category.findOne({ name: item })
              ).id
            ),
          },
        },
        {
          $lookup: {
            from: "Strategy",
            localField: "_id",
            foreignField: "cate",
            as: "dataList",
          },
        },
      ]);
      data.push(d);
    }
    res.send(data);
  });

  // 英雄攻略
  strategyRouter.post("/heroStrategy", async (req, res) => {
    const { name } = req.body;
    let data = {
      vdo: [],
      article: [],
    };
    // let heroId = await allModel.Hero.findOne({name}).id
    let strategy = await allModel.Strategy.find(
      { heros: name },
      { _id: 0, content: 0, cate: 0 }
    );
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
  });

  // 获取资源
  const resourceRouter = express.Router();
  app.use("/web/api/resources", resourceRouter);

  // 文章, 英雄详情
  resourceRouter.post("/resource", async (req, res, next) => {
    const { type } = req.body;
    if (type === "article") {
      let article = await allModel.Article.find({ iId: req.body.id });
      if (!article.length) {
        article = await allModel.Strategy.find({ newsId: req.body.id });
      }
      if (article.length) {
        res.send(article[0]);
      } else {
        res.send({ msg: `没有 id 为 ${req.body.id} 的文章!` });
      }
      return next();
    }

    if (type === "hero") {
      let hero = await allModel.Hero.aggregate([
        {
          $match: { name: req.body.name },
        },
        {
          $lookup: {
            from: "Category",
            localField: "cate",
            foreignField: "_id",
            as: "cate",
          },
        },
        {
          $lookup: {
            from: "Summoner",
            localField: "summonersId",
            foreignField: "id",
            as: "summonersId",
          },
        },
        {
          $lookup: {
            from: "Inscription",
            localField: "InscriptionId",
            foreignField: "id",
            as: "InscriptionId",
          },
        },
        {
          $lookup: {
            from: "Items",
            localField: "downWind.equipment",
            foreignField: "itemId",
            as: "downWindEquipment",
          },
        },
        {
          $lookup: {
            from: "Items",
            localField: "upWind.equipment",
            foreignField: "itemId",
            as: "upWindEquipment",
          },
        },
        {
          $project: {
            _id: 0,
            __v: 0,
            cate: {
              _id: 0,
              __v: 0,
              parent: 0,
              desc: 0,
            },
            levelUp: {
              _id: 0,
            },
            skills: {
              _id: 0,
            },
            relations: {
              _id: 0,
              hero: {
                _id: 0,
                // ename: 0
              },
            },
            skins: {
              _id: 0,
            },
            summonersId: {
              _id: 0,
            },
            InscriptionId: {
              _id: 0,
              __v: 0,
              type: 0,
              grade: 0,
              id: 0,
            },
            tips: {
              _id: 0,
            },
            "downWind.equipment": {
              _id: 0,
              // 'itemId': 0,
              price: 0,
              star: 0,
              desc: 0,
              passive: 0,
              __v: 0,
            },
            "upWind.equipment": {
              _id: 0,
              // 'itemId': 0,
              price: 0,
              star: 0,
              desc: 0,
              passive: 0,
              __v: 0,
            },
          },
        },
      ]);

      // type 需要是 ObjectId, mongoose.Schema 需要 ref
      // let hero = await allModel.Hero.findOne({name: req.body.name}).populate("cate summonersId")

      if (hero.length) {
        res.send(hero[0]);
      } else {
        res.send({ msg: `没有英雄: ${req.body.name}!` });
      }
      return next();
    }

    if (type === "video") {
      let vdoInfo = await allModel.Strategy.findOne({ vdoId: req.body.id });
      if (vdoInfo) {
        res.send(vdoInfo);
      } else {
        res.send({ msg: `没有 id 为 ${req.body.id} 的视频!` });
      }
      return next();
    }

    res.status(400).send({ message: "传入的参数有误" });
  });

  // 赛事中心
  const raceRouter = express.Router();
  app.use("/web/api/race", raceRouter);

  // 赛事中心
  raceRouter.post("/center", async (req, res, next) => {
    const { name, pageNum = 1, pageSize = 10 } = req.body;
    let parentId = (await allModel.Category.findOne({ name: "赛事中心" }))?.id;
    let raceId = (await allModel.Category.findOne({ parent: parentId, name }))?.id;
    let count = await allModel.Article.find({
      cate: {
        $in: [raceId],
      }
    }).count();
    if (count <= 0) {
      res.send({ total: count, dataList: [], name });
    } else {
      let skip = (pageNum - 1) * pageSize
      skip = skip >= count ? (count - pageSize) : skip
      let data = await allModel.Article.find(
        {
          cate: {
            $in: [raceId],
          },
        },
        {
          __v: 0,
          _id: 0,
          cate: 0,
          content: 0,
        }
      )
      .skip(skip)
      .limit(pageSize);
      res.send({ total: count, dataList: data, name });
    }
  });
};
