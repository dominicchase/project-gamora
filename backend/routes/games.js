const express = require("express");
const router = express.Router();
const { getGameImage, getGames } = require("../controllers/games");

router.get("/", getGames);

router.get("/game/image/", getGameImage);

module.exports = router;
