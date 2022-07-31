const mongoose = require("mongoose");

const summonerSchema = new mongoose.Schema({
  id: { type: String, require: true },
  name: { type: String, require: true },
  rank: String,
  img: String,
  description: String,
});

const Summoner = mongoose.model("Summoner", summonerSchema, "Summoner");

module.exports = Summoner;
