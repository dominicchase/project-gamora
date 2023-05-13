const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },

  quantity: {
    type: Number,
    required: true,
  },
});

exports.OrderItem = mongoose.model("OrderItem", orderItemSchema);
