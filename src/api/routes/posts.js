const express = require("express");
const {
    createPost,
    getPosts,
    updatePost,
    deletePost
} = require("../controllers/post");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(isLoggedIn, createPost);
router.route("/update/:_id").put(isLoggedIn, updatePost);
router.route("/delete/:_id").delete(isLoggedIn, deletePost);
router.route("/get").get(isLoggedIn, getPosts);

module.exports = router;