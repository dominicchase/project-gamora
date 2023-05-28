const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const { User } = require("../models/user");

const getAccessToken = (email) =>
  jwt.sign(
    {
      email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    // TODO: 5 or 15 mins
    { expiresIn: 60 * 60 * 1000 }
  );

const clearCookie = (res) =>
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (bcrypt.compareSync(password, user.passwordHash)) {
      const accessToken = getAccessToken(user.email);

      const refreshToken = jwt.sign(
        {
          email: user.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      await user.set("refreshToken", refreshToken).save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        // 1d in ms
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ accessToken, ...(user.isAdmin && { isAdmin: user.isAdmin }) });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  },

  logout: async (req, res) => {
    const cookies = req.cookies;

    if (!"jwt" in cookies) {
      return res.sendStatus(204);
    }

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken });

    if (!user) {
      clearCookie(res);

      res.sendStatus(204);
    }

    await user.set("refreshToken", undefined).save();

    clearCookie(res);

    res.sendStatus(204);
  },

  refresh: async (req, res) => {
    const cookies = req.cookies;

    if (!("jwt" in cookies)) {
      return res.status(401).json({ message: "Failed to find refresh token" });
    }

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken });

    if (!user) {
      return res.sendStatus(403);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error || user.email !== decoded.email) {
          return res.sendStatus(403);
        }

        const accessToken = getAccessToken(user.email);

        res.status(200).json({
          accessToken,
          ...(user.isAdmin && { isAdmin: user.isAdmin }),
        });
      }
    );
  },

  register: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      res.status(409).json({ message: "User already exists" });
    }

    try {
      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        passwordHash,
      });

      const savedUser = await user.save();

      res.status(201).send(savedUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
