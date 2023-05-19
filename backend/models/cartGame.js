const mongoose = require("mongoose");

const cartGameSchema = mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
  },

  quantity: {
    type: Number,
    default: 0,
    required: true,
  },

  //   price: {
  //     type: Number,
  //     default: 0,
  //     required: true,
  //   },
});

exports.CartGame = mongoose.model("CartGame", cartGameSchema);
