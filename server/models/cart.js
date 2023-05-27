const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartGame",
    },
  ],
});

exports.Cart = mongoose.model("Cart", cartSchema);
