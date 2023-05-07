const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true,
  },
  images: [{ type: String }],
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  category: {
    // type: "Xbox 360" | "PS4",
    type: String,
  },
  quantity: { type: Number, required: true },
});

gameSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

gameSchema.set("toJSON", {
  virtuals: true,
});

exports.Game = mongoose.model("Game", gameSchema);
