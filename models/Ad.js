const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  name: String,
  items: [
    {
      img: String,
      url: String,
    },
  ],
});

const Ad = mongoose.model("Ad", adSchema, 'Ad');

module.exports = Ad;
