const { Game } = require("../models/game");
const { s3_uploadImage_v2 } = require("../helpers/s3");
const { Category } = require("../models/category");

module.exports = {
  createGame: async (req, res) => {
    const { name, category, numInStock, price, description } = req.body;

    try {
      if (await Game.exists({ name })) {
        throw new Error("Game already exists");
      }

      const [image] = await s3_uploadImage_v2([req.files[0]]);

      const categoryFromModel = await Category.findOne({
        categoryEnum: category,
      });

      const game = new Game({
        name,
        category: categoryFromModel,
        price,
        description,
        image: image.Location,
        numInStock,
      });

      await game.save();

      const populatedGame = await game.populate("category");

      return res.status(201).send(populatedGame);
    } catch (err) {
      res.status(500).json({ error: err });
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
    const { name, category, price, numInStock, description } = req.body;

    try {
      const [image] = await s3_uploadImage_v2([req.files[0]]);

      const categoryObj = await Category.findOne({ categoryEnum: category });

      const game = await Game.findByIdAndUpdate(
        req.query.id,
        {
          ...(name && { name }),
          ...(price && { price }),
          ...(categoryObj && { category: categoryObj }),
          ...(image && { image: image.Location }),
          ...(numInStock && { numInStock }),
          ...(description && { description }),
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

  createCategory: async (req, res) => {
    const { categoryName, categoryEnum } = req.body;

    const category = await Category.findOne({ categoryEnum });
    if (category) {
      return res
        .status(500)
        .json({ error: `Category '${categoryEnum}' already exists` });
    }

    try {
      const category = new Category({
        categoryName,
        categoryEnum,
      });

      await category.save();

      res.send(category);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  deleteCategory: async (req, res) => {
    const { categoryEnum } = req.body;

    const category = await Category.findOne({ categoryEnum });
    if (!category) {
      return res
        .status(500)
        .json({ error: `Category '${categoryEnum}' does not exist` });
    }

    try {
      const category = await Category.findOneAndDelete({
        categoryEnum,
      });

      res.send(category);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  getCategories: async (_req, res) => {
    const categories = await Category.find().sort({
      categoryName: "ascending",
    });

    if (!categories) {
      return res.status(500).json({ error: "Failed to find categories" });
    }

    return res.send(categories);
  },
};
