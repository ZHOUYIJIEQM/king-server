module.exports = (app, multer) => {
  const path = require("path")
  const express = require("express")
  const fs = require("fs");
  const router = express.Router()

  // 登录校验
  const auth = require('../../middleWare/validate.js')
  // 权限校验
  const { authority } = require('../../middleWare/access.js')
  
  app.use('/admin/api/upload', auth(app), authority(), router)

  /**
   * 设置上传 multer
   * @param {string} uploadPath 保存的路径
   */
  const multerSet = (uploadPath) => {
    return multer({ 
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          let p = path.join(__dirname, `../../public/upload/${uploadPath}`)
          if (!fs.existsSync(p)) {
            console.log('新建文件夹:', p);
            fs.mkdirSync(p, { recursive: true })
          }
          cb(null, p)
        },
        filename: function (req, file, cb) {
          // console.log('请求file', file);
          let fileName = ''
          if (req.body.name) {
            // file.originalname 中文名乱码, 需前端主动传入文件名
            let name = req.body.name.split('.')
            fileName = `${name.slice(0, -1).join('')}-${Date.now()}.${name.at(-1)}`
          } else {
            fileName = file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').at(-1)
          }
          // console.log('文件名: ', fileName);
          cb(null, fileName)
        }
      }) 
    }).single('file')
  }
  /**
   * 返回文件
   * @param {string} uploadPath 保存的路径
   */
  const sendFile = (uploadPath) => {
    return async (req, res) => {
      const file = req.file
      file.url = `http://localhost:3080/upload/${uploadPath}/${req.file.filename}`
      res.send(file)
    }
  }
  
  // 物品
  const items = multerSet('items')
  router.post('/items', items, sendFile('items'))
  
  // 英雄头像
  const heroAvatar = multerSet('hero')
  router.post('/hero', heroAvatar, sendFile('hero'))

  // 技能图片
  const skills = multerSet('skills')
  router.post('/skills', skills, sendFile('skills'))

  // 皮肤图片
  const skins = multerSet('skins')
  router.post('/skins', skins, sendFile('skins'))

  // 视频上传
  const introduction = multerSet('introduction')
  router.post('/introduction', introduction, sendFile('introduction'))

  // 文章图片
  const articles = multerSet('articles')
  router.post('/articles', articles, sendFile('articles'))

  // 广告轮播图片
  const advertisement = multerSet('advertisement')
  router.post('/advertisement', advertisement, sendFile('advertisement'))
  
}