const mongoose = require('mongoose');
const { Schema } = mongoose;

const InscriptionSchema = Schema({
  name: { type: String, required: true },
  id: String,
  type: String,
  grade: Number,
  img: String,
  desc: [String],
});

const Inscription = mongoose.model("Inscription", InscriptionSchema, "Inscription");

module.exports = Inscription;
