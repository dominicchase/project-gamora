const express = require("express");
const router = express.Router();
const { payWithStripe } = require("../controllers/pay");

router.post("/", payWithStripe);

module.exports = router;
