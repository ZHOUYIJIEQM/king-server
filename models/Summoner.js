const mongoose = require('mongoose');
const { Schema } = mongoose;

const summonerSchema = Schema({
  name: { type: String, required: true },
  id: String,
  rank: Number,
  img: String,
  description: String,
});

const Summoner = mongoose.model("Summoner", summonerSchema, "Summoner");

module.exports = Summoner;
