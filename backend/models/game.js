const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: String,
  image: String,
  quantity: { type: Number, required: true },
});

exports.Game = mongoose.model("Game", gameSchema);
