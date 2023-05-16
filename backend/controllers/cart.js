const { Cart } = require("../models/cart");
const { Game } = require("../models/game");

module.exports = {
  addToCart: async (req, res) => {
    const { gameId, name, price, quantity } = req.body;

    try {
      const cart = await Cart.findOne({ userId: req.query.id });

      if (cart) {
        const game = await Game.findById(gameId);

        const { cartId, games } = await Cart.findOne({ userId: req.query.id });

        const updatedCart = await Cart.findByIdAndUpdate(
          cartId,
          {
            game,
          },
          {
            new: false,
          }
        ).populate("games");

        res.status(201).send(updatedCart);
      } else {
        const game = await Game.findById(gameId);

        const newCart = await Cart.create({
          userId: req.query.id,
          games: [game],
        });

        res.status(201).send(newCart);
      }
    } catch (error) {
      return res.status(500).json({ status: 500, message: "" });
    }
  },

  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.query.id }).populate(
        "games"
      );

      res.status(200).send(cart);
    } catch (event) {
      res.status(500).send({ status: status, message: "" });
    }
  },
};
