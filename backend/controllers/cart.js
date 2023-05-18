const mongoose = require("mongoose");

const { Cart } = require("../models/cart");
const { Game } = require("../models/game");
const { User } = require("../models/user");

module.exports = {
  addToCart: async (req, res) => {
    const gameIds = req.body;

    try {
      const user = await User.findById(req.query.userId);
    } catch (event) {
      res.status(500).json({ status: 500, message: "User not found" });
    }

    try {
      const cart = await Cart.findOne({ userId: req.query.userId }).populate(
        "games"
      );

      if (cart) {
        await Cart.findOneAndUpdate(
          { userId: req.query.userId },
          { games: [...cart.games, ...req.body] },
          { new: true }
        )
          .populate("games")
          .then((cart) => res.status(201).send(cart))
          .catch((error) => res.status(error));
      } else {
        await Cart.create({
          userId: req.query.userId,
          games: req.body,
        })
          .then((cart) => res.send(cart))
          .catch((error) => res.status(error));
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Add to cart failed" });
    }
  },

  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.query.userId }).populate(
        "games"
      );

      if (!cart) {
        res.status(200).send([]);
      }

      res.status(200).send(cart);
    } catch (event) {
      res.status(500).send({ status: 500, message: "" });
    }
  },

  getCarts: async (req, res) => {
    try {
      const carts = await Cart.find().populate("games");

      if (!carts) {
        res.status(500).json({ status: 500, message: "" });
      }

      res.status(200).send(carts);
    } catch (event) {
      res.status(500).send({ status: 500, message: "" });
    }
  },
};
