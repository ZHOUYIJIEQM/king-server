const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = Schema({
  itemId: {type: String, require: true },
  name: { type: String, required: true },
  price: { type: Number, require: true },
  icon: String,
  star: Number,
  desc: [String],
  passive: [String],
});

const Items = mongoose.model("Items", itemSchema, "Items");

module.exports = Items;
