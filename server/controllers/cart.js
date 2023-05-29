const { Cart } = require("../models/cart");
const { CartGame } = require("../models/cartGame");
const { Game } = require("../models/game");

module.exports = {
  addToCart: async (req, res) => {
    const games = req.body;

    try {
      const cart = await Cart.findOne({ userId: req.query.id });

      if (!cart) {
        const newCart = new Cart({
          userId: req.query.id,
          games: [],
        });

        await newCart.save();

        const gamesWithCartId = games.map((game) => ({
          ...game,
          cartId: newCart._id,
        }));

        const cartGames = await CartGame.create(gamesWithCartId);

        const updatedCart = await Cart.findOneAndUpdate(
          { userId: req.query.id },
          { $push: { games: { $each: cartGames } } },
          { new: true }
        ).populate({
          path: "games",
          populate: "game",
        });

        return res.send(updatedCart);
      } else {
        games.forEach(async ({ game, quantity }) => {
          const { name, numInStock } = await Game.findById(game);
          const cartGame = await CartGame.findOne({
            game,
            cartId: cart._id,
          });

          const cartGameQuantity = cartGame?.quantity ?? 0;

          if (quantity + cartGameQuantity > numInStock) {
            return res.status(500).json({
              error: `Can not add ${quantity} copy/copies of ${name} to cart. 'numInStock' is ${numInStock}`,
            });
          }

          const updatedCartGame = await CartGame.findOneAndUpdate(
            { game, cartId: cart._id },
            { $inc: { quantity } },
            { new: true }
          );

          if (!updatedCartGame) {
            const newCartGame = new CartGame({
              cartId: cart._id,
              game,
              quantity,
            });

            const populatedCartGame = await newCartGame.populate("game");

            await populatedCartGame.save();

            const updatedCart = await Cart.findOneAndUpdate(
              { userId: req.query.id },
              { $push: { games: populatedCartGame } },
              { new: true }
            ).populate({ path: "games", populate: "game" });

            await updatedCart.save();
          }
        });

        // TODO: resolve bug where this guy is empty
        const updatedCart = await Cart.findOne({ userId: req.query.id });

        return res.send(updatedCart);
      }
    } catch (error) {
      console.log(error);
    }
  },

  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.query.id })
        .populate({
          path: "games",
          populate: "game",
        })
        .sort({ name: 1 });

      if (!cart) {
        return res.status(200).send([]);
      }

      return res.status(200).send(cart);
    } catch (event) {
      return res.status(500).send({ status: 500, message: "" });
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
    const game = req.query.game;

    const cart = await Cart.findOne({ userId: req.query.id });

    if (!cart) {
      return res.status(500).json({
        status: 500,
        error: `Cart does not exist for user ${req.query.id}`,
      });
    }

    try {
      const cartGame = await CartGame.findOne({
        game,
        cartId: cart._id,
      }).populate("game");

      if (!cartGame) {
        return res
          .status(500)
          .json({ status: 500, error: "Game not found in cart" });
      }

      const updatedCart = await Cart.findOneAndUpdate(
        { userId: req.query.id },
        { $pull: { games: cartGame._id } },
        { new: true }
      ).populate({ path: "games", populate: "game" });

      await CartGame.findOneAndDelete({ game, cartId: cart._id });

      console.log({ updatedCart });

      return res.send(updatedCart);
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
