module.exports = (app, multer) => {
  const express = require("express")
  const router = express.Router()

  // 登录校验
  const auth = require('../../middleWare/validate.js')
  // 权限校验
  const { authority } = require('../../middleWare/access.js')
  
  app.use('/admin/api/upload', auth(app), authority(), router)

  
  
  
}