
const path = require("path");
const readBase = require(path.join(__dirname, "../models", "readBase"));
const cardsPath = path.join(__dirname, "../data/cards.json");

/*CARDS*/
exports.getCards = (req, res) => {
  readBase.readBase(cardsPath)
    .then((data) => {
      const cardsSchedule = JSON.parse(data);
      res.status(200).json({
        status: "success",
        results: cardsSchedule.length,
        data: {
          cardsSchedule,
        },
      });
    })
    .catch(() => {
      res.status(500).json({ message: "Запрашиваемый ресурс не найден" });
    });
};
