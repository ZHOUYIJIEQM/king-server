// 校验token, 获取用户信息
const jwt = require('jsonwebtoken')

module.exports = app => {
  return async (req, res, next) => {
    // note: 有坑, req.headers 里属性名全是小写字母, 不能写 req.headers.Authorization, 与http协议有关
    if (!req.headers.authorization) {
      return res.status(401).send({ message: '请先登录!' })
    }
    // 获取请求携带的token
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).send({ message: '请先登录!' })
    }
    // 解密后得到用户id
    const { id } = jwt.verify(token, app.get('secret'))
    if (!id) {
      return res.status(401).send({ message: '无效的 jwt token!' })
    }
    // 根据id查找用户, 放到req方便在下个中间件使用
    req.user = await require('../models/AdminUser').findById(id)
    if (!req.user) {
      return res.status(401).send({ message: '用户不存在!' })
    }
    next()
  }
}