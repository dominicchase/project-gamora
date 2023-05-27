const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },

  email: {
    type: String,
    required: true,
  },

  // phone: {
  //   type: String,
  //   required: true,
  // },

  passwordHash: {
    type: String,
    required: true,
  },

  // verified: {
  //   type: Boolean,
  //   default: false,
  // },

  accessToken: {
    type: String,
  },

  refreshToken: {
    type: String,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
