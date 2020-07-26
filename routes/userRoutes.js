const express = require("express");
const {
  getAllUsers,
  getUser,
  /*  checkID,*/
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser);

module.exports = router;
