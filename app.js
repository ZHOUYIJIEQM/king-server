const express = require("express");
const cors = require("cors");
const app = express();
const mongodb = require("./utils/mongodb");
const webApi = require("./routes/web/index");
const adminApi = require("./routes/admin/index");
const staticRes = require("./routes/static/index")
const bodyParser = require("body-parser");

// 自定义jwt密钥字符串
app.set("secret", "kingAdminNode123456");
// 上传的基础路径
app.set("fileUploadUrl", "https://app.yjsjyb.top/upload")
// app.set("fileUploadUrl", "http://localhost:3080/upload")
// 对请求体进行解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 设置跨域
app.use(cors())
// 连接数据库
mongodb.once("open", async () => {
  console.log("mongoDB连接成功!");
});

// 移动端接口
webApi(app);
// 后台管理接口
adminApi(app);
// 托管静态资源
staticRes(app)

const port = 3080;
app.listen(port, () => {
  console.log(`服务器运行: http://localhost:${port}`);
});
