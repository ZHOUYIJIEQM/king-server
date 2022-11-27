const home = require("./home");
const race = require("./race");
const strategy = require("./strategy");
const resource = require("./resource");

module.exports = (app) => {
  home(app);
  race(app);
  strategy(app);
  resource(app);
};
