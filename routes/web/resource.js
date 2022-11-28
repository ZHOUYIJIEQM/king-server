module.exports = async (app) => {
  const express = require("express");
  const path = require("path");
  const allModel = require("require-all")(path.join(__dirname, "..", "..", "models"));

  // 攻略
  const resourceRouter = express.Router();
  app.use("/web/api/resources", resourceRouter);

  // 文章, 英雄详情
  resourceRouter.post("/resource", async (req, res) => {
    try {
      const { id, name, type } = req.body;
      if (type === "article") {
        let article = null
        if (name) {
          article = await allModel.Article.findOne({ name });
        }
        if (id) {
          article = await allModel.Article.findOne({ _id: id });
        }
        if (!article) {
          article = await allModel.Strategy.findOne({ _id: id })
        }
        console.log(article);
        return res.send(article)
      }

      if (type === "hero") {
        let query = null
        if (name) {
          query = allModel.Hero.findOne({ name });
        }
        if (id) {
          query = allModel.Hero.findById(id);
        }
        let hero = await query.select("-__v")
          .populate({ path: "category", select: "-_id name" })
          .populate({ path: "inscriptionId", select: "-_id name img desc" })
          .populate({ path: "summonersId", select: "-_id name img" })
          .populate({ path: "equipment.downWind", select: "-_id name icon" })
          .populate({ path: "equipment.upWind", select: "-_id name icon" })
          .populate({ path: "relations.relation.hero", select: "-_id name avatar" }).lean()
        hero.category = hero.category.map(i => i.name)
        hero.levelUp = hero.levelUp.map(i => {
          let index = hero.skills.findIndex(item => item.id === i)
          return {
            name: hero.skills[index].name,
            icon: hero.skills[index].icon
          }
        })
        return res.send(hero)
      }

      if (type === "video") {
        let vdoInfo = null
        if (name) {
          vdoInfo = await allModel.Strategy.findOne({ name });
        }
        if (id) {
          vdoInfo = await allModel.Strategy.findOne({ vdoId: id });
        }
        return res.send(vdoInfo)
      }
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: `${req.path}: ${error.message}` })
    }
  });

};
