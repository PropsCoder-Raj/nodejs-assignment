const express = require("express");
const {
    createWether,
    getWether,
    updateWether,
    deleteWether,
    getWetherAllFields
} = require("../controllers/wether");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(isLoggedIn, createWether);
router.route("/update/:_id").put(isLoggedIn, updateWether);
router.route("/delete/:_id").delete(isLoggedIn, deleteWether);
router.route("/get").get(isLoggedIn, getWether);
router.route("/search").get(isLoggedIn, getWetherAllFields);

module.exports = router;