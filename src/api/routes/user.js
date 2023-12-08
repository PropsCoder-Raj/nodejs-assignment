const express = require("express");
const {
  createUser,
  signin,
  followUnfollowUser
} = require("../controllers/user");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(createUser);
router.route("/signin").post(signin);

router.route("/followUnfollowUser/:userId").post(isLoggedIn, followUnfollowUser);

module.exports = router;