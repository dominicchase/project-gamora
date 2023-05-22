const express = require("express");
const router = express.Router();

const {
  createGame,
  deleteGame,
  getAllPlatforms,
  getGames,
  getGameById,
  updateGame,
} = require("../controllers/games");
const upload = require("../middleware/upload");

router.get("/", getGames);

router.get("/game/", getGameById);

router.get("/game/platforms", getAllPlatforms);

router.post("/", upload.array("image"), createGame);

router.put("/:id", updateGame);

router.delete("/delete/", deleteGame);

module.exports = router;
