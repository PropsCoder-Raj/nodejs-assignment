const express = require("express");
const {
    createMovies,
    getMovies,
    updateMovies,
    deleteMovies,
    getMoviesAllFields
} = require("../controllers/movies");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(isLoggedIn, createMovies);
router.route("/update/:_id").put(isLoggedIn, updateMovies);
router.route("/delete/:_id").delete(isLoggedIn, deleteMovies);
router.route("/get").get(isLoggedIn, getMovies);
router.route("/search").get(isLoggedIn, getMoviesAllFields);

module.exports = router;