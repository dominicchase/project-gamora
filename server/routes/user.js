const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  register,
  refresh,
  getUser,
} = require("../controllers/user");

// router.get("/find/", getUser);

router.post("/login", login);

router.get("/logout", logout);

router.get("/refresh", refresh);

router.post("/register", register);

module.exports = router;
