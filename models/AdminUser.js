const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { Schema } = mongoose;

const adminUserSchema = Schema(
  {
    userName: { type: String, required: true },
    passWord: {
      type: String,
      // 查询时默认不返回密码
      select: false,
      set(val) {
        return bcryptjs.hashSync(val, bcryptjs.genSaltSync(10));
      },
    },
    status: { type: Boolean, default: true },
    roles: [String],
    // time : { type : Date, default: Date.now }
  },
  { timestamps: true }
);

const AdminUser = mongoose.model("AdminUser", adminUserSchema, "AdminUser");

module.exports = AdminUser;
