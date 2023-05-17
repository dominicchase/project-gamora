const express = require("express");
const router = express.Router();

const { addToCart, getCart, getCarts } = require("../controllers/cart");

// ---------------------------------
// ---------- CUST APIs ------------
// ---------------------------------

router.post("/add-to-cart/", addToCart);

router.get("/", getCart);

router.get("/all", getCarts);

module.exports = router;
