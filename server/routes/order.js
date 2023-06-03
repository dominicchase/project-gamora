const express = require("express");
const router = express.Router();
const { getOrders, getOrderByEmail } = require("../controllers/order");

router.get("/", getOrders);

router.get("/order/", getOrderByEmail);

module.exports = router;
