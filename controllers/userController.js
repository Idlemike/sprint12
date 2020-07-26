const fs = require("fs");
const path = require("path");

const usersPath = path.join(__dirname, "../data/users.json");
const cardsPath = path.join(__dirname, "../data/cards.json");

// function for reading files
function readBase(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err); // in the case of error, control flow goes to the catch block with the error occured.
      } else {
        resolve(data); // in the case of success, control flow goes to the then block with the content of the file.
      }
    });
  });
}

exports.getCards = (req, res) => {
  readBase(cardsPath)
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

/*USERS*/
exports.getAllUsers = (req, res) => {
  readBase(usersPath)
    .then((data) => {
      const userSchedule = JSON.parse(data);
      res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: userSchedule.length,
        data: {
          userSchedule,
        },
      });
    })
    .catch(() => {
      res.status(500).json({ message: "Запрашиваемый ресурс не найден" });
    });
};
/*USERS ID*/
exports.getUser = (req, res) => {
  readBase(usersPath)
    .then((data) => {
      const userSchedule = JSON.parse(data);
      let isThereUser = false;
      userSchedule.forEach((item) => {
        if (item._id === req.params.id) {
          isThereUser = true;
        }
      });
      if (!isThereUser) {
        return res.status(404).json({
          message: "Нет пользователя с таким id",
        });
      }
      const scheduleItem = userSchedule.find((el) => el._id === req.params.id);
      return res.status(200).json({
        status: "success",
        data: {
          scheduleItem,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Запрашиваемый ресурс не найден" });
    });
};
