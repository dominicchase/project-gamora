const { Game } = require("../models/game");

module.exports = {
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
    console.log("here");
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
};