const express = require("express");
const router = express.Router();
const { getUsers, getUserById, getUserCount } = require("./GET");
const { createUser, login } = require("./POST");

// GET

router.get("/", getUsers);

router.get("/:id", getUserById);

router.get("/:count", getUserCount);

// POST

router.post("/", createUser);

router.post("/login", login);

module.exports = router;
