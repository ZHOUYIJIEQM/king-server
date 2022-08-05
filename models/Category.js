const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = Schema({
  name: { type: String, require: true },
  parent: {
    type: Schema.Types.ObjectId,
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
