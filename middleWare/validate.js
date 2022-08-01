module.exports = app => {
  const jwt = require('jsonwebtoken')
  return async (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: '请先登录!' })
    }

    // token
    const token = req.headers.authorization.split(' ').pop()
    if (!token) {
      return res.status(401).send({ message: '请先登录!' })
    }
    // console.log('token', token);

    // 解密后获取用户 id
    const { id } = jwt.verify(token, app.get('secret'))
    if (!id) {
      return res.status(401).send({ message: '无效的 jwt token!' })
    }
    // console.log('id', id);

    // 根据 id 获取用户名
    req.user = await require('../models/AdminUser').findById(id)
    if (!req.user) {
      return res.status(401).send({ message: '用户不存在!' })
    }
    // console.log('req.user', req.user);
    
    next()
  }
}