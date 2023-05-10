const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  address1: {
    type: String,
    default: "",
  },

  address2: {
    type: String,
    default: "",
  },

  city: {
    type: String,
    default: "",
  },

  country: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  name: {
    type: String,
    required: true,
  },

  passwordHash: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    default: "",
  },

  zip: {
    type: String,
    default: "",
  },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
