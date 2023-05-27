const express = require("express");
const router = express.Router();
const { login, logout, register, refresh } = require("../controllers/user");

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh", refresh);

router.post("/register", register);

module.exports = router;
