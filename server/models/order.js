const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
  },

  customer: {
    name: String,
    email: String,
    address: {
      city: String,
      country: String,
      line1: String,
      line2: String,
      postal_code: String,
      state: String,
    },
  },

  billing: {
    amountSubtotal: Number,
    amountDiscount: Number,
    amountShipping: Number,
    amountTax: Number,
    amountTotal: Number,
  },

  items: [
    {
      game: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
});

exports.Order = mongoose.model("Order", orderSchema);
