const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  image: String,
  quantity: { type: Number, required: true },
});

exports.User = mongoose.model("User", userSchema);
