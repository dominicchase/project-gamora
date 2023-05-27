const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: { type: String, required: true },

  numInStock: { type: Number, required: true },
});

exports.Game = mongoose.model("Game", gameSchema);
