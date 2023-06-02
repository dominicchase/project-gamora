const express = require("express");
const router = express.Router();
const { paymentIntent } = require("../controllers/stripe");

router.post(
  "/payment-intent",
  express.raw({ type: "application/json" }),
  paymentIntent
);

module.exports = router;
