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

// ---------------------------------
// ---------- CUST APIs ------------
// ---------------------------------

router.get("/", getGames);

router.get("/:id", getGameById);

router.get("/game/platforms", getAllPlatforms);

// ---------------------------------
// ---------- ADMIN APIs -----------
// ---------------------------------

router.post("/", createGame);

router.put("/:id", updateGame);

router.delete("/:id", deleteGame);

module.exports = router;
