const express = require("express");
const {
  getAllUsers,
  getUser,
  checkID,
} = require("../controllers/userController");

const router = express.Router();

//check id is exist
router.param("id", checkID);

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser);

module.exports = router;
