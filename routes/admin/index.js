const login = require("./login");
const common = require("./common");
const uploadApi = require('./upload');

module.exports = (app) => {
  login(app);
  common(app);
  uploadApi(app);
}