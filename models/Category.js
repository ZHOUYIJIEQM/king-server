const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    default: null,
  },
  desc: String,
});

// categorySchema.virtual("children", {
//   localField: "_id",
//   foreignField: "parent",
//   justOne: false,
//   ref: "Category",
// });

const Category = mongoose.model("Category", categorySchema, "Category");

module.exports = Category;
