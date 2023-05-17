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
        const { games } = cart;

        const updatedGames = await Promise.all(
          gameIds.map(async (gameId) => {
            const game = await Game.findById(gameId);

            if (games.find(({ gameId }) => gameId == game.gameId)) {
              return await { ...game.toObject(), quantity: game.quantity + 1 };
            }

            return await { ...game.toObject() };
          })
        );

        const updatedCart = await Cart.findOneAndUpdate(
          { userId: req.query.userId },
          { games: updatedGames },
          { new: true }
        ).populate("games");

        res.status(201).send(updatedCart);
      } else {
        const user = await User.findById(req.query.userId);

        const newGames = await Promise.all(
          gameIds.map(async (gameId) => await Game.findById(gameId))
        );

        const newCart = await Cart.create({
          userId: user,
          games: newGames,
        });

        console.log(newCart);

        res.status(201).send(newCart);
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
