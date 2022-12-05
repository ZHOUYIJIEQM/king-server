// 静态资源 
module.exports = app => {
  const express = require("express");
  const path = require("path");
  app.use("/", express.static(path.join(__dirname, "..", "..", "public", "kingAdmin")));
  // http://localhost:3080/kingm 访问这里的目录
  app.use("/kingm", express.static(path.join(__dirname, "..", "..", "public", "kingMobile")));
  app.use("/douyin", express.static(path.join(__dirname, "..", "..", "public", "douyin")));
  app.use("/music", express.static(path.join(__dirname, "..", "..", "public", "neteaseMusic")));
  app.use("/upload", express.static(path.join(__dirname, "..", "..", "public", "kingUpload")));
}