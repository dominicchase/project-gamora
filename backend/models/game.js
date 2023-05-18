const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  // description: {
  //   type: String,
  //   required: true,
  // },

  // image: {
  //   type: String,
  //   required: true,
  // },

  // images: [{ type: String }],

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    default: 0,
    required: true,
  },

  quantity: { type: Number, required: true },

  // richDescription: {
  //   type: String,
  //   default: "",
  // },
});

// gameSchema.virtual("gameId").get(function () {
//   return this._id.toHexString();
// });

// gameSchema.set("toJSON", {
//   virtuals: true,
// });

exports.Game = mongoose.model("Game", gameSchema);
