const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = Schema({
  name: { type: String, required: true },
  content: String,
  // 文章id
  id: String,
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  createdTime: { type : Date, default: Date.now },
});

const Article = mongoose.model("Article", articleSchema, "Article");

module.exports = Article;
