const mongoose = require("mongoose");

const { Game } = require("../models/game");

module.exports = {
  createGame: async (req, res) => {
    var game = new Game({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      quantity: req.body.quantity,
    });

    game = await game.save();

    if (!game) {
      return res.status(500).send("Game can not be created...");
    }

    return res.send(game);
  },

  deleteGame: async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid ID...");
    }

    Game.findByIdAndRemove(req.params.id)
      .then((game) => {
        if (game) {
          return res
            .status(200)
            .json({ success: true, message: "Game removed..." });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "Game not removed..." });
        }
      })
      .catch((err) => res.status(500).json({ success: false, error: err }));
  },

  getAllPlatforms: async (req, res) => {
    const gameList = (await Game.find().select("category")).map(
      (game) => game.category
    );

    res.send([...new Set(gameList)]);
  },

  getGameById: async (req, res) => {
    const game = await Game.findById(req.params.id);

    if (!game) {
      res.status(500).json({ success: false });
    }

    res.send(game);
  },

  getGames: async (req, res) => {
    let filter = {};

    if (req.query.category) {
      filter = { category: req.query.category };
    }

    const gameList = await Game.find(filter);

    if (!gameList) {
      res.status(500).json({ success: false });
    }

    res.send(gameList);
  },

  updateGame: async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid ID...");
    }

    var game = await Game.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
      },
      { new: true }
    );

    if (!game) {
      return res.status(500).send("Game can not be updated...");
    }

    return res.send(game);
  },
};
