const express = require("express");
const router = express.Router();
const { pay } = require("../controllers/payment");

router.post("/", pay);

module.exports = router;
