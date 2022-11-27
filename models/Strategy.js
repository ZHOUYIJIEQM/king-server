const mongoose = require("mongoose");
const { Schema } = mongoose;

const strategySchema = Schema({
  // 标题头
  name: { type: String, required: true },
  // 作者
  author: String,
  // 预览图片
  img: String,
  // 视频时长
  iTime: String,
  // 分类
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  // 对应英雄
  heros: [String],
  // 视频id
  vdoId: { type: String, default: "" },
  newsId: { type: String, default: "" },
  // 创建的时间
  createdTime: String,
  // 播放次数
  playCount: String,
  // 攻略文章内容
  content: { type: String, default: "" },
});

const Strategy = mongoose.model("Strategy", strategySchema, "Strategy");

module.exports = Strategy;
