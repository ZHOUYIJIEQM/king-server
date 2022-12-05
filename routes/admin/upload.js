// 文件上传
const multer = require("multer");
const express = require("express");
const path = require("path");
const fs = require("fs");

module.exports = (app) => {
  const uploadRouter = express.Router();
  const fileUploadUrl = app.get("fileUploadUrl");
  const uploadDir = path.join(__dirname, "../../public/kingUpload/");
  const validate = require("../../middleWare/validate");
  const access = require("../../middleWare/access");
  app.use("/admin/api/upload", validate(app), access(), uploadRouter);

  /**
   * 使用 multer
   * https://github.com/expressjs/multer
   * @param {string} saveDir 上传文件要保存的文件夹
   */
  const multerSet = (saveDir) => {
    return multer({
      // 磁盘存储引擎可以让你控制文件的存储。
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          try {
            let dir = path.join(uploadDir, saveDir)
            if (!fs.existsSync(dir)) {
              console.log("新建文件夹:", dir);
              fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
          } catch (error) {
            console.log(error);
          }
        },
        filename: function (req, file, cb) {
          try {
            // console.log(req.body);
            let fileName = String(Date.now());
            if (req.body.name) {
              // file.originalname 中文乱码, 名称从上传时携带的参数获取
              let name = req.body.name.split(".");
              fileName = `${name.slice(0, -1).join("")}-${Date.now()}.${name.at(-1)}`;
              // fileName = req.body.name
            } else {
              fileName = file.fieldname + "-" + Date.now() + "." + file.originalname.split(".").at(-1);
            }
            // 修改了 req.file.filename
            cb(null, fileName);
          } catch (error) {
            console.log(error);
          }
        }
      })
    }).single("file");
  }

  /**
   * 返回文件
   * @param {string} saveDir 保存的路径
   */
  const sendFile = (saveDir) => {
    return async (req, res) => {
      const file = req.file;
      file.url = `${fileUploadUrl}/${saveDir}/${req.file.filename}`;
      res.send(file);
    };
  };

  // 装备
  uploadRouter.post("/items", multerSet("items"), sendFile("items"))
  // 英雄头像
  uploadRouter.post("/heros", multerSet("heros"), sendFile("heros"))
  // 技能图片
  uploadRouter.post("/skills", multerSet("skills"), sendFile("skills"))
  // 皮肤图片
  uploadRouter.post("/skins", multerSet("skins"), sendFile("skins"))
  // 文章图片
  uploadRouter.post("/articles", multerSet("articles"), sendFile("articles"))
  // 铭文
  uploadRouter.post("/inscription", multerSet("inscription"), sendFile("inscription"))
  // 召唤师技能
  uploadRouter.post("/summoner", multerSet("summoner"), sendFile("summoner"))
  // 广告轮播图片
  uploadRouter.post("/advertisement", multerSet("advertisement"), sendFile("advertisement"))
};
