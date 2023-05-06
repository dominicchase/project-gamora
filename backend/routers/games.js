const { Game } = require("../models/game");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const gameList = await Game.find();

  if (!gameList) {
    res.status(500).json({ success: false });
  }

  res.send(gameList);
});

router.post("/count", (req, res) => {
  const game = new Game({
    name: req.body.name,
    image: req.body.image,
    quantity: req.body.quantity,
  });

  game
    .save()
    .then((newGame) => res.status(201).json(newGame))
    .catch((err) => res.status(500).json({ error: err, success: false }));
});

module.exports = router;
