const mongoose = require('mongoose');
const { Schema } = mongoose;

const adSchema = Schema({
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
