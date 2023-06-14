const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  price: {
    type: Number,
    required: true,
  },

  description: String,

  image: { type: String, required: true },

  numInStock: { type: Number, required: true },
});

exports.Game = mongoose.model("Game", gameSchema);
