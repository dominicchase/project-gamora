const { Game } = require("../models/game");
const { s3_uploadImage_v2 } = require("../helpers/s3");

module.exports = {
  createGame: async (req, res) => {
    const { name, numInStock, price } = req.body;

    try {
      if (await Game.exists({ name })) {
        throw new Error("Game already exists");
      }

      const [image] = await s3_uploadImage_v2([req.files[0]]);

      const game = new Game({
        name,
        price,
        image: image.Location,
        numInStock,
      });

      const savedGame = await game.save();

      return res.status(201).send(savedGame);
    } catch (error) {
      res.status(500).json({ error: "Failed to create game" });
    }
  },

  deleteGame: async (req, res) => {
    try {
      await Game.findByIdAndRemove(req.query.id);

      return res.status(200).json({ success: true, message: "Game removed" });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  },

  updateGame: async (req, res) => {
    const { name, price, numInStock } = req.body;

    try {
      const [image] = await s3_uploadImage_v2([req.files[0]]);

      const game = await Game.findByIdAndUpdate(
        req.query.id,
        {
          ...(name && { name }),
          ...(price && { price }),
          ...(image && { image: image.Location }),
          ...(numInStock && { numInStock }),
        },
        {
          new: true,
        }
      );
      return res.send(game);
    } catch (event) {
      return res.status(500).send("Failed to update game.");
    }
  },
};
