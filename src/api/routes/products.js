const express = require("express");
const {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductAllFields
} = require("../controllers/products");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(isLoggedIn, createProduct);
router.route("/update/:_id").put(isLoggedIn, updateProduct);
router.route("/delete/:_id").delete(isLoggedIn, deleteProduct);
router.route("/get").get(isLoggedIn, getProduct);
router.route("/search").get(isLoggedIn, getProductAllFields);

module.exports = router;