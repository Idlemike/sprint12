/* eslint-disable no-restricted-syntax */
const fs = require("fs");
const path = require("path");

const schedule = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/users.json"))
);

//check id is exist, middleware
exports.checkID = (req, res, next, val) => {
  let isThereUser;
  for (const item of schedule) {
    if (item._id === val) {
      isThereUser = true;
    }
  }
  if (!isThereUser) {
    return res.status(404).json({
      message: "Нет пользователя с таким id",
    });
  }
  next();
};
/*USERS*/
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: schedule.length,
    data: {
      schedule,
    },
  });
};

/*USERS ID*/
exports.getUser = (req, res) => {
  const scheduleItem = schedule.find((el) => el._id === req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      scheduleItem,
    },
  });
};
