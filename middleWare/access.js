function authority() {
  return async (req, res, next) => {
    // console.log('req.user.level', req.user.level);
    if (req.user.level > 1) {
      return res.status(403).send({
        message: '您的权限无法使用此操作!'
      })
    }
    return next()
  }
}

module.exports = {
  authority
}