// 登录接口
const allModel = require("require-all")(require("path").join(__dirname, "..", "..", "models"));
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = app => {
  app.post(
    "/admin/api/login",
    async (req, res, next) => {
      try {
        const { userName, passWord } = req.body;
        // 查找是否有该用户
        const user = await allModel.AdminUser.findOne({ userName }).select("+passWord");
        if (!user) {
          res.status(422).send({ message: "不存在此用户!" });
          return next();
        }
        if (!user.status) {
          res.status(422).send({ message: "该账号已被停用!" })
          return next();
        }
        // 校验密码
        const isValid = bcryptjs.compareSync(passWord, user.passWord);
        if (!isValid) {
          res.status(422).send({ message : "密码错误!" });
          return next();
        }
        // 根据 用户id 生成 token`
        const token = jwt.sign({ id: user.id }, app.get("secret"));
        return res.send({
          message: "登录成功!",
          userName,
          userRoles: user.roles,
          token,
        })
      } catch (error) {
        console.log(error);
        res.status(400).send({ message: `${req.path}: ${error.message}` })
      }
    }
  )
}