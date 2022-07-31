const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    // 文章id
    iId: String,
    title: String,
    cate: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    // url: String,
    content: String,
    createdTime: String,
  },
  // {
  //   timestamps: true,
  // }
);

const Article = mongoose.model("Article", articleSchema, "Article");

module.exports = Article;
