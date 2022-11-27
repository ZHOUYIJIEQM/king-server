const cors = require("cors");
const express = require("express");
const app = express();
const mongodb = require("./utils/mongodb");
const webApi = require("./routes/web/index");
const adminApi = require("./routes/admin/index");
const path = require("path");
const bodyParser = require("body-parser");

// 自定义jwt密钥字符串
app.set("secret", "kingAdminNode123456");
app.set("fileUploadUrl", "http://localhost:3080/upload")
// 解决 req.body 为 {}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 设置跨域
app.use(cors());
// 连接数据库
mongodb.once("open", async () => {
  console.log("mongoDB连接成功!");
});

// 移动端接口
webApi(app);
// 后台管理接口
adminApi(app);

// 托管静态资源
app.use("/", express.static(path.join(__dirname, "public", "kingAdmin")));
app.use("/kingm", express.static(path.join(__dirname, "public", "kingMobile")));
app.use("/douyin", express.static(path.join(__dirname, "public", "douyin")));
app.use("/music", express.static(path.join(__dirname, "public", "neteaseMusic")));
app.use("/upload", express.static(path.join(__dirname, "public", "kingUpload")));

const port = 3080;
app.listen(port, () => {
  console.log(`服务器运行: http://localhost:${port}`);
});
