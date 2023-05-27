const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cart");

router.post("/add-to-cart/", addToCart);

router.get("/", getCart);

router.post("/remove-from-cart", removeFromCart);

router.post("/update-cart/", updateCart);

module.exports = router;
