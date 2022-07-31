const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    // note: 查询时不返回password
    select: false,
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    },
  },
  level: { type: Number },
});

const AdminUser = mongoose.model("AdminUser", adminUserSchema, 'AdminUser');

module.exports = AdminUser;
