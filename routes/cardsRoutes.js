const express = require("express");
const { getCards } = require("../controllers/cardsController");

const router = express.Router();

router.route("/").get(getCards);

module.exports = router;
