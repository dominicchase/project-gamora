const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrderById,
  getOrders,
} = require("../controllers/orders");

router.post("/", createOrder);

router.get("/order/", getOrderById);

router.get("/", getOrders);

module.exports = router;
