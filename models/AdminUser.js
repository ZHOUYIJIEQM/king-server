const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");
const { Schema } = mongoose;


const adminUserSchema = Schema({
  username: { type: String },
  password: {
    type: String,
    // note: 查询时不返回password
    select: false,
    set(val) {
      return bcryptjs.hashSync(val, bcryptjs.genSaltSync(10))
    },
  },
  level: { type: Number },
});

const AdminUser = mongoose.model("AdminUser", adminUserSchema, 'AdminUser');

module.exports = AdminUser;
