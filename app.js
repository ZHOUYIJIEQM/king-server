const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const dbConnect = require("./utils/db.js");
const webApi = require("./routes/web/index.js");
const adminApi = require("./routes/admin/index.js");
const uploadApi = require('./routes/admin/upload.js');
const path = require("path");

// 自定义jwt密钥字符串
app.set("secret", "kingAdminNode123456");

// 设置跨域
app.use(cors());
// 请求体转为json对象
app.use(express.json());
// 连接数据库
dbConnect();
// 移动端接口
webApi(app);
// 后台管理接口
adminApi(app);
// 上传接口
uploadApi(app, multer)

// 托管静态资源
app.use('/', express.static(path.join(__dirname, 'public', 'web')));
app.use('/m', express.static(path.join(__dirname, 'public', 'mobile')));
// 上传
// app.use('/uploads', express.static(__dirname + '/uploads'))



// 监听其他错误
app.use((err, req, res, next) => {
  console.log("请求错误", err);
  if (!err.statusCode) {
    return res.status(500).send({ message: err.message });
  }
  return res.status(err.statusCode).send({
    message: err.message,
  });
});

const port = 3080;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
