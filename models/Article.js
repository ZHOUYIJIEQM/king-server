const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = Schema(
  {
    // 文章id
    iId: String,
    title: String,
    cate: [{ type: Schema.Types.ObjectId, ref: "Category" }],
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
