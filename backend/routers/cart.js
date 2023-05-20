const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  getCarts,
  updateCart,
  removeFromCart,
} = require("../controllers/cart");

// ---------------------------------
// ---------- CUST APIs ------------
// ---------------------------------

router.post("/add-to-cart/", addToCart);

router.get("/", getCart);

router.get("/all", getCarts);

router.post("/remove-from-cart", removeFromCart);

router.post("/update-cart/", updateCart);

module.exports = router;
