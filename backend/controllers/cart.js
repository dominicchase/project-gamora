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

      if (!cart) {
        const cartGame = await CartGame.create({
          game,
          quantity,
        });

        const cart = await Cart.create({
          userId: req.query.userId,
          games: [cartGame],
        });

        res.send(cart);
      } else {
        var cartGame = await CartGame.findOne({ game }).populate("game");

        if (!cartGame) {
          cartGame = await CartGame.create({
            game,
            quantity,
          });
          const updatedCart = await Cart.findOneAndUpdate(
            { userId: req.query.userId },
            { games: [...cart.games, cartGame] },
            { new: true }
          ).populate("games");
          res.send(updatedCart);
        }

        cartGame = await CartGame.findOneAndUpdate(
          { game },
          { quantity: cartGame.quantity + quantity }
        ).populate("game");

        console.log({ cartGame });

        const updatedCart = await Cart.findOneAndUpdate(
          { userId: req.query.userId },
          { games: [...cart.games, cartGame] },
          { new: true }
        ).populate("games");

        console.log({ updatedCart });

        res.send(updatedCart);
      }
    } catch (error) {}
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
