const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// getUsers
router.get("/", async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }

  res.send(userList);
});

// getUserCount
router.get("/:count", async (req, res) => {
  const userCount = await User.countDocuments();

  if (!userCount) {
    res.status(500).json({ success: false });
  }

  res.send({ userCount });
});

// getUser by ID
router.get("/:id", async (req, res) => {
  const userList = await User.findById(req.params.id).select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }

  res.send(userList);
});

// createUser
router.post("/", async (req, res) => {
  const {
    name,
    email,
    password,
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
    passwordHash: bcrypt.hashSync(password, 10),
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

// password: MyTestPassword10!

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const secret = process.env.SECRET;

  if (!user) {
    return res.status(400).send("User not found...");
  }

  if (bcrypt.compareSync(password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );
    return res.status(200).send({ email, token });
  } else {
    return res.status(400).send("Incorrect password...");
  }
});

module.exports = router;
