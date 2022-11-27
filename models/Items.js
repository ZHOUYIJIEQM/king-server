const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = Schema({
  name: { type: String, required: true },
  id: String,
  price: Number,
  icon: String,
  star: Number,
  desc: [String],
  passive: [String],
});

const Items = mongoose.model("Items", itemSchema, "Items");

module.exports = Items;
