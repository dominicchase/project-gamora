const express = require("express");
const router = express.Router();
const {
  getGameImage,
  getGames,
  getCategories,
} = require("../controllers/games");

router.get("/", getGames);

router.get("/image/", getGameImage);

router.get("/categories", getCategories);

module.exports = router;
