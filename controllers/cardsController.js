const fs = require("fs");
const path = require("path");

/*CARDS*/
exports.getCards = (req, res) => {
  const dataPath = path.join(__dirname, "../data/cards.json");
  fs.readFile(dataPath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Запрашиваемый ресурс не найден" });
      return;
    }
    const cardsSchedule = JSON.parse(data);
    res.status(200).json({
      status: "success",
      results: cardsSchedule.length,
      data: {
        cardsSchedule,
      },
    });
  });
};
