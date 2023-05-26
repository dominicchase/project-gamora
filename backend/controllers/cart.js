const mongoose = require("mongoose");

const { Cart } = require("../models/cart");
const { Game } = require("../models/game");
const { User } = require("../models/user");
const { CartGame } = require("../models/cartGame");

module.exports = {
  addToCart: async (req, res) => {
    const { game, quantity } = req.body;

    try {
      const cart = await Cart.findOne({ userId: req.query.userId });

      let cartGame;

      if (!cart) {
        cartGame = await CartGame.create({
          game,
          quantity,
        });

        cartGame = await cartGame.populate("game");

        const cart = await Cart.create({
          userId: req.query.userId,
          games: [cartGame],
        });

        res.send(cart);
      } else {
        cartGame = await CartGame.findOne({ game }).populate("game");

        if (!cartGame) {
          cartGame = await CartGame.create({
            game,
            quantity,
          });

          const updatedCart = await Cart.findOneAndUpdate(
            { userId: req.query.userId },
            { $push: { games: cartGame } },
            { new: true }
          ).populate({ path: "games", populate: "game" });

          return res.send(updatedCart);
        }

        cartGame = await CartGame.findOneAndUpdate(
          { game },
          { $inc: { quantity } },
          { new: true }
        ).populate("game");

        const updatedCart = await Cart.findOne({
          userId: req.query.userId,
        }).populate({ path: "games", populate: "game" });

        return res.send(updatedCart);
      }
    } catch (error) {}
  },

  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.query.userId })
        .populate({
          path: "games",
          populate: "game",
        })
        .sort({ name: 1 });

      if (!cart) {
        res.status(200).send([]);
      }

      res.status(200).send(cart);
    } catch (event) {
      res.status(500).send({ status: 500, message: "" });
    }
  },

  getCarts: async (_req, res) => {
    try {
      const carts = await Cart.find().populate({
        path: "games",
        populate: "game",
      });

      if (!carts) {
        res.status(500).json({ status: 500, message: "" });
      }

      res.status(200).send(carts);
    } catch (event) {
      res.status(500).send({ status: 500, message: "" });
    }
  },

  removeFromCart: async (req, res) => {
    const { game } = req.body;

    try {
      const cartGame = await CartGame.findOne({ game }).populate("game");

      console.log(cartGame);

      if (!cartGame) {
        return res.status(500).json({ status: 500, message: "" });
      }

      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.query.userId },
        { $pull: { games: cartGame._id } },
        { new: true }
      ).populate({ path: "games", populate: "game" });

      res.send(updatedCart);
    } catch (error) {}
  },

  updateCart: async (req, res) => {
    const { game, quantity } = req.body;

    try {
      const cartGame = await CartGame.findOneAndUpdate(
        { game },
        { quantity },
        { new: true }
      ).populate("game");

      if (!cartGame) {
        return res.status(500).json({ status: 500, message: "" });
      }

      const updatedCart = await Cart.findOne({
        userId: req.query.userId,
      }).populate({ path: "games", populate: "game" });

      res.send(updatedCart);
    } catch (error) {}
  },
};
