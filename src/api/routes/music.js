const express = require("express");
const {
    createMusic,
    getMusic,
    updateMusic,
    deleteMusic,
    getMusicAllFields
} = require("../controllers/music");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(isLoggedIn, createMusic);
router.route("/update/:_id").put(isLoggedIn, updateMusic);
router.route("/delete/:_id").delete(isLoggedIn, deleteMusic);
router.route("/get").get(isLoggedIn, getMusic);
router.route("/search").get(isLoggedIn, getMusicAllFields);

module.exports = router;