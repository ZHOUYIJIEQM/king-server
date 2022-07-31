module.exports = () => {
  const mongoose = require('mongoose')
  // 连接数据库
  mongoose.connect("mongodb://spiderUser:spiderUser@127.0.0.1:27017/spider");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB 连接错误："));
  db.once("open", async () => {
    console.log("数据库连接成功!");
  });
}