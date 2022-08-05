const mongoose = require('mongoose');
const { Schema } = mongoose;

const summonerSchema = Schema({
  id: { type: String, require: true },
  name: { type: String, require: true },
  rank: String,
  img: String,
  description: String,
});

const Summoner = mongoose.model("Summoner", summonerSchema, "Summoner");

module.exports = Summoner;
