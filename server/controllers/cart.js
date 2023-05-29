const { Cart } = require("../models/cart");
const { CartGame } = require("../models/cartGame");
const { Game } = require("../models/game");

module.exports = {
  addToCart: async (req, res) => {
    const games = req.body;

    try {
      const cart = await Cart.findOne({ userId: req.query.id });

      // ----------- VALIDATION -------------
      for (var i = 0; i < games.length; i++) {
        // check if game DNE in Game model
        const game = await Game.findById(games[i].game);

        if (!game) {
          return res
            .status(500)
            .json({ error: `Failed to find game: ${games[i].game}` });
        }

        // check if incomingQuantity would exceed numInStock
        const cartGame = await CartGame.findOne({ cartId: cart._id, game });

        const currCartGameQuantity = cartGame?.quantity ?? 0;
        const nextCartGameQuantity = games[i].quantity;
        const quantity = currCartGameQuantity + nextCartGameQuantity;

        if (quantity > game.numInStock) {
          return res.status(500).json({
            error: `Failed to add ${nextCartGameQuantity} ${
              nextCartGameQuantity > 1 ? "copies" : "copy"
            } of ${
              game.name
            } to cart because quantity = ${currCartGameQuantity} and numInStock = ${
              game.numInStock
            }`,
          });
        }
      }

      // ----------- ADD TO CART LOGIC -------------
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
        const newCartGames = [];

        for (var i = 0; i < games.length; i++) {
          const { game, quantity } = games[i];

          const cartGame = await CartGame.findOne({
            cartId: cart._id,
            game,
          });

          if (!cartGame) {
            const newCartGame = new CartGame({
              cartId: cart._id,
              game,
              quantity,
            });

            const populatedCartGame = await newCartGame.populate("game");
            newCartGames.push(populatedCartGame);
            await populatedCartGame.save();
          } else {
            const updatedCartGame = await CartGame.findOneAndUpdate(
              {
                cartId: cart._id,
                game,
              },
              { $inc: { quantity } },
              { new: true }
            );

            const populatedCartGame = await updatedCartGame.populate("game");
            await populatedCartGame.save();
          }
        }

        const updatedCart = await Cart.findOneAndUpdate(
          { userId: req.query.id },
          { $push: { games: { $each: newCartGames } } },
          { new: true }
        ).populate({
          path: "games",
          populate: "game",
        });

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
