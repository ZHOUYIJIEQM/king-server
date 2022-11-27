const mongoose = require('mongoose')
// 连接数据库
mongoose.connect("mongodb://kingdbuser:kingdbpsw@127.0.0.1:27017/kingdb");
const mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "MongoDB 连接错误："));

module.exports = mongoDB