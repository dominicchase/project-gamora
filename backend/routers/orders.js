const express = require("express");
const router = express.Router();

const {
  createOrder,
  deleteOrder,
  getOrderById,
  getUserOrders,
  getOrders,
  updateOrder,
} = require("../controllers/orders");

router.post("/", createOrder);

router.delete("/delete/", deleteOrder);

router.get("/order/", getOrderById);

router.get("/user/", getUserOrders);

router.get("/", getOrders);

router.put("/update/", updateOrder);

module.exports = router;
