const mongoose = require("mongoose");

const InscriptionSchema = new mongoose.Schema({
  id: String,
  type: String,
  grade: String,
  name: String,
  img: String,
  desc: [String],
});

const Inscription = mongoose.model("Inscription", InscriptionSchema, "Inscription");

module.exports = Inscription;
