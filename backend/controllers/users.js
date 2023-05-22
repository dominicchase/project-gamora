const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const { User } = require("../models/user");

module.exports = {
  createUser: async (req, res) => {
    try {
      const passwordHash = await bcrypt.hash(re.body.password, 10);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        passwordHash,
        verified: false,
      });

      const savedUser = await user.save();

      res.status(201).send(savedUser);
    } catch (error) {
      res.status(500).json({ status: 500, message: "Failed to create user" });
    }
  },

  deleteUser: async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid ID...");
    }

    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (user) {
          return res
            .status(200)
            .json({ success: true, message: "User removed..." });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "User not removed..." });
        }
      })
      .catch((err) => res.status(500).json({ success: false, error: err }));
  },

  getUserById: async (req, res) => {
    const userList = await User.findById(req.params.id).select("-passwordHash");

    if (!userList) {
      res.status(500).json({ success: false });
    }

    res.send(userList);
  },

  getUserCount: async (req, res) => {
    const userCount = await User.countDocuments();

    if (!userCount) {
      res.status(500).json({ success: false });
    }

    res.send({ userCount });
  },

  getUsers: async (req, res) => {
    const userList = await User.find().select("-passwordHash");

    if (!userList) {
      res.status(500).json({ success: false });
    }

    res.send(userList);
  },

  login: async (req, res) => {
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
    } else return res.status(400).send("Incorrect password...");
  },
};
