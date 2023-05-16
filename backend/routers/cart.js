const express = require("express");
const router = express.Router();

const { addToCart, getCart } = require("../controllers/cart");

// ---------------------------------
// ---------- CUST APIs ------------
// ---------------------------------

router.post("/add-to-cart/", addToCart);

router.get("/", getCart);

module.exports = router;
