const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  image: String,
  quantity: { type: Number, required: true },
});

exports.Category = mongoose.model("Category", categorySchema);
