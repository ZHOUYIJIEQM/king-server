const bcryptjs = require("bcryptjs");
const value = 'abcdef123456'
let salt = bcryptjs.genSaltSync(10)
let hash = bcryptjs.hashSync(value, salt)
// 校验, value 正确返回 true
let compare = bcryptjs.compareSync(value, hash)
console.log(compare); // true