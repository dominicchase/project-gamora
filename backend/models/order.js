const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  image: String,
  quantity: { type: Number, required: true },
});

exports.Order = mongoose.model("Order", orderSchema);
