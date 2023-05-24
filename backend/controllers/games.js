const mongoose = require("mongoose");

const { Game } = require("../models/game");

const { s3_uploadImage_v2 } = require("../s3");

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

  getAllPlatforms: async (req, res) => {
    const gameList = (await Game.find().select("category")).map(
      (game) => game.category
    );

    res.send([...new Set(gameList)]);
  },

  getGameById: async (req, res) => {
    try {
      const game = await Game.findById(req.query.id);
      res.status(200).send(game);
    } catch {
      res.status(500).json({ status: 500, message: "" });
    }
  },

  getGameImage: async (req, res) => {
    try {
      const { image: url } = await Game.findById(req.query.id);

      const image = await fetch(url);

      const blob = await image.blob();

      const arrayBuffer = await blob.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);

      res.send(buffer);
    } catch (error) {}
  },

  getGames: async (req, res) => {
    const page = req.query.page ?? 0;
    const size = req.query.size ?? 12;

    try {
      const totalGames = (await Game.find()).length;
      const totalPages = Math.ceil(totalGames / size);

      const games = await Game.find()
        .sort({ name: 1 })
        .skip(page * size)
        .limit(size);
      res
        .status(200)
        .send({ games: games, page: +page, totalPages, totalGames });
    } catch (event) {
      res.status(500).json({ status: 500, message: "" });
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
