const mongoose = require("mongoose");

// interface Order {
//   date: Date;
//   city: string;
//   country: string;
//   orderItems: any[];
//   phone: string;
//   price: number;
//   shippingAddress1: string;
//   shippingAddress2: string;
//   status: string;
//   user: any;
//   zip: string;
// }

const orderSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },

  city: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],

  phone: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
  },

  shippingAddress1: {
    type: String,
    required: true,
  },

  shippingAddress2: {
    type: String,
  },

  status: {
    type: String,
    required: true,
    default: "Pending",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  zip: {
    type: String,
    required: true,
  },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

exports.Order = mongoose.model("Order", orderSchema);
