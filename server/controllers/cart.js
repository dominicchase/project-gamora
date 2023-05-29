const { Cart } = require("../models/cart");
const { CartGame } = require("../models/cartGame");

module.exports = {
  createNewCart: async (req, res) => {
    const newCartGames = req.body;

    const cartGames = await CartGame.create(newCartGames);

    const cart = new Cart({
      userId: req.query.id,
      games: cartGames,
    });

    const savedCart = await cart.save();

    const populatedCart = await savedCart.populate({
      path: "games",
      populate: "game",
    });

    return res.send(populatedCart);
  },

  addToCart: async (req, res) => {
    const { game, quantity } = req.body;

    try {
      const cart = await Cart.findOne({ userId: req.query.id });

      let cartGame;

      if (!cart) {
        cartGame = new CartGame({
          game,
          quantity,
        });

        const savedCartGame = await cartGame.save();

        const populatedCartGame = await savedCartGame.populate("game");

        const cart = new Cart({
          userId: req.query.id,
          games: [populatedCartGame],
        });

        const savedCart = await cart.save();

        const populatedCart = await savedCart.populate({
          path: "games",
          populate: "game",
        });

        return res.send(populatedCart);
      } else {
        cartGame = await CartGame.findOne({ game }).populate("game");

        if (!cartGame) {
          cartGame = await CartGame.create({
            game,
            quantity,
          });

          const updatedCart = await Cart.findOneAndUpdate(
            { userId: req.query.id },
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
          userId: req.query.id,
        }).populate({ path: "games", populate: "game" });

        return res.send(updatedCart);
      }
    } catch (error) {}
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
