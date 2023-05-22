const mongoose = require("mongoose");

const userVerificationSchema = new mongoose.Schema({
  userId: String,

  uniqueString: String,

  createdAt: Date,

  expiresAt: Date,
});

exports.UserVerification = mongoose.model(
  "UserVerification",
  userVerificationSchema
);
