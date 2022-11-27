// 检验权限是否可以执行操作
module.exports = () => {
  return async (req, res, next) => {
    if (!req.user.roles.includes('admin')) {
      return res.status(403).send({ message: '您的权限无法执行此操作!' })
    }
    return next()
  }
}