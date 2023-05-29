const mongoose = require("mongoose");

const cartGameSchema = mongoose.Schema({
  cartId: {
    type: String,
    require: true,
  },

  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },

  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
});

exports.CartGame = mongoose.model("CartGame", cartGameSchema);
