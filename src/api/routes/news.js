const express = require("express");
const {
    createNews,
    getNews,
    updateNews,
    deleteNews,
    getNewsByTitleORCategory
} = require("../controllers/news");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(isLoggedIn, createNews);
router.route("/update/:_id").put(isLoggedIn, updateNews);
router.route("/delete/:_id").delete(isLoggedIn, deleteNews);
router.route("/get").get(isLoggedIn, getNews);
router.route("/search").get(isLoggedIn, getNewsByTitleORCategory);

module.exports = router;