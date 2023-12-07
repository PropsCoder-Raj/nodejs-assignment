const express = require("express");
const {
  createUser,
  signin
} = require("../controllers/user");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(createUser);
router.route("/signin").post(signin);

module.exports = router;