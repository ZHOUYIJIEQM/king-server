module.exports = async (app) => {
  const express = require("express");
  const path = require("path");
  const allModel = require("require-all")(path.join(__dirname, "..", "..", "models"));
  
  // 赛事
  const raceRouter = express.Router();
  app.use("/web/api/race", raceRouter);

  // 赛事中心
  raceRouter.post("/center", async (req, res, next) => {
    try {
      const { name, pageNum = 1, pageSize = 10 } = req.body;
      let parent = await allModel.Category.findOne({ name: "赛事中心" });
      let raceId = (await allModel.Category.findOne({ parent: parent._id, name }))._id;
      // 查看总数
      let count = await allModel.Article.find({
        category: { $in: [ raceId ] }
      }).count();
      
      if (count <= 0) {
      return res.send({ total: count, dataList: [], name });
      }

      let skip = (pageNum - 1) * pageSize;
      skip = skip >= count ? count - pageSize : skip;
      let data = await allModel.Article.find({ category: { $in: [ raceId ] } }, { __v: 0, category: 0, content: 0 })
        .skip(skip).limit(pageSize);
      return res.send({ total: count, dataList: data, name });
    } catch (error) {
      console.log(error);
      res.status(404).send({ message: `${req.path}: ${error.message}` })
    }
  });
}