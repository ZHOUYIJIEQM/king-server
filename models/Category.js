const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = Schema({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  desc: String,
});

const Category = mongoose.model("Category", categorySchema, "Category");

module.exports = Category;
