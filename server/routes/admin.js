const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createGame, deleteGame, updateGame } = require("../controllers/admin");

router.post("/create", upload.array("image"), createGame);

router.put("/update/", upload.array("image"), updateGame);

router.delete("/delete/", deleteGame);

module.exports = router;
