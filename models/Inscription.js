const mongoose = require('mongoose');
const { Schema } = mongoose;

const InscriptionSchema = Schema({
  id: String,
  type: String,
  grade: String,
  name: String,
  img: String,
  desc: [String],
});

const Inscription = mongoose.model("Inscription", InscriptionSchema, "Inscription");

module.exports = Inscription;
