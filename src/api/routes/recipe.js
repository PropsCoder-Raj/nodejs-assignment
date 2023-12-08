const express = require("express");
const {
    createRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeByTitleORIngradients
} = require("../controllers/recipe");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(isLoggedIn, createRecipe);
router.route("/update/:_id").put(isLoggedIn, updateRecipe);
router.route("/delete/:_id").delete(isLoggedIn, deleteRecipe);
router.route("/get").get(isLoggedIn, getRecipe);
router.route("/search").get(isLoggedIn, getRecipeByTitleORIngradients);

module.exports = router;