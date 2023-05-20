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

// cartSchema.virtual("cartId").get(function () {
//   return this._id.toHexString();
// });

// cartSchema.set("toJSON", {
//   virtuals: true,
// });

exports.Cart = mongoose.model("Cart", cartSchema);
