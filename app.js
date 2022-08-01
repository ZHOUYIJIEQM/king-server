const express = require('express')
const cors = require('cors')
const app = express()
const dbConnect = require("./utils/db.js");
const webApi = require("./routes/web/index.js");
const adminApi = require("./routes/admin/index.js");

// 自定义bcrypt密钥字符串
app.set('secret', 'kingAdminNode123456')

// 设置跨域
app.use(cors())
// 请求体转为json对象
app.use(express.json())
// 连接数据库
dbConnect()
// 移动端接口
webApi(app)
// 后台管理接口
adminApi(app)

app.post(
  '/login',
  async (req, res, next) => {
    // res.send('home =======')
    console.log(req.body);
    return res.status(422).send({
      message: 'home 422'
    })
  }
)

const port = 3080
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})