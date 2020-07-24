const fs = require("fs");
const path = require("path");

const cardsSchedule = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/cards.json"))
);
/*CARDS*/
exports.getCards = (req, res) => {
  res.status(200).json({
    status: "success",
    results: cardsSchedule.length,
    data: {
      cardsSchedule,
    },
  });
};
