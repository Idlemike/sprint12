const path = require("path");
const readBase = require(path.join(__dirname, "../models", "readBase"));
const usersPath = path.join(__dirname, "../data/users.json");

/*USERS*/
exports.getAllUsers = (req, res) => {
  readBase.readBase(usersPath)
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
  readBase.readBase(usersPath)
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
