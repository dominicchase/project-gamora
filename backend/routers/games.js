const { Game } = require("../models/game");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// getGames
router.get("/", async (req, res) => {
  let filter = {};

  if (req.query.category) {
    filter = { category: req.query.category };
  }

  const gameList = await Game.find(filter);

  if (!gameList) {
    res.status(500).json({ success: false });
  }

  res.send(gameList);
});

// getGame by ID
router.get("/:id", async (req, res) => {
  const game = await Game.findById(req.params.id);

  if (!game) {
    res.status(500).json({ success: false });
  }

  res.send(game);
});

// ---------------------------------
// --------- ADMIN APIS ------------
// ---------------------------------

// use this as admin to make new games for sale ??
// createGame
router.post("/", async (req, res) => {
  const {
    name,
    description,
    richDescription,
    image,
    price,
    category,
    quantity,
  } = req.body;

  var game = new Game({
    name,
    description,
    richDescription,
    image,
    price,
    category,
    quantity,
  });

  game = await game.save();

  if (!game) {
    return res.status(500).send("Game can not be created...");
  }

  return res.send(game);
});

// use this as admin to update games for sale ??
// updateGame
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid ID...");
  }

  const {
    name,
    description,
    richDescription,
    image,
    price,
    category,
    quantity,
  } = req.body;

  var game = await Game.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      richDescription,
      image,
      price,
      category,
      quantity,
    },
    { new: true }
  );

  if (!game) {
    return res.status(500).send("Game can not be updated...");
  }

  return res.send(game);
});

// use this as admin to delete games for sale ??
// deleteGame
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
