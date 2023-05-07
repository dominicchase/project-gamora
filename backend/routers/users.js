const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({ success: false });
  }

  res.send(userList);
});

router.post("/", async (req, res) => {
  const {
    name,
    email,
    passwordHash,
    phone,
    isAdmin,
    country,
    address1,
    address2,
    city,
    state,
    zip,
  } = req.body;

  var user = new User({
    name,
    email,
    passwordHash,
    phone,
    isAdmin,
    country,
    address1,
    address2,
    city,
    state,
    zip,
  });

  user = await user.save();

  if (!user) {
    return res.status(500).send("User can not be created...");
  }

  return res.send(user);
});

module.exports = router;
