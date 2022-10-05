const mongoose = require("mongoose");

mongoose.connect("mongodb://kingdbuser:kingdbpsw@127.0.0.1:27017/kingdb");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB 连接错误："));
db.once("open", async () => {
  console.log("连接成功!");
  // todo: 在这里执行爬取数据操作
  // new Spider().run();
});