const { Category } = require("../models/category");
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
    const page = req.query.page ?? 0;
    const size = req.query.size ?? 12;

    try {
      // TODO: clean up later
      let categories;
      if (req.query.categories) {
        categories = await Promise.all(
          req.query.categories.split(",").map(
            async (category) =>
              await Category.findOne({
                categoryEnum: category,
              })
          )
        );
      }

      let regex;
      if (req.query.search) {
        regex = req.query.search;
      }

      const allGames = await Game.find({
        ...(categories && { category: { $in: categories } }),
        ...(req.query.search && {
          name: { $regex: new RegExp(regex, "i") },
        }),
      })
        .sort({ name: "ascending" })
        .skip(page * size)
        .populate("category");

      const games = await Game.find({
        ...(categories && { category: { $in: categories } }),
        ...(req.query.search && {
          name: { $regex: new RegExp(regex, "i") },
        }),
      })
        .sort({ name: "ascending" })
        .skip(page * size)
        .populate("category")
        .limit(size)
        .lean();

      const totalGames = allGames.length;
      const totalPages = Math.ceil(totalGames / size);
      res
        .status(200)
        .send({ games: games, page: +page, totalPages, totalGames });
    } catch (event) {
      res.status(500).json({ status: 500, message: "" });
    }
  },

  getCategories: async (req, res) => {
    const categories = await Category.find().sort({
      categoryName: "ascending",
    });

    if (!categories) {
      return res.status(500).json({ error: "Failed to find categories" });
    }

    const filteredCategories = [];
    for (var i = 0; i < categories.length; i++) {
      const category = categories[i];

      const gameExistsWithCategory = await Game.findOne({
        category,
      });

      if (gameExistsWithCategory) {
        filteredCategories.push(category);
      }
    }

    return res.send(filteredCategories);
  },
};
