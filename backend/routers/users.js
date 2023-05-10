const express = require("express");
const router = express.Router();

const {
  createUser,
  deleteUser,
  getUserById,
  getUserCount,
  getUsers,
  login,
} = require("../controllers/users");

// GET

router.get("/", getUsers);

router.get("/:id", getUserById);

router.get("/user/count", getUserCount);

// POST

router.post("/", createUser);

router.delete("/:id", deleteUser);

router.post("/login", login);

module.exports = router;
