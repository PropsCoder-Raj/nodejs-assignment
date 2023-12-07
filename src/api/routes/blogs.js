const express = require("express");
const {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog,
    getBlogsByTitle
} = require("../controllers/blog");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(isLoggedIn, createBlog);
router.route("/update/:_id").put(isLoggedIn, updateBlog);
router.route("/delete/:_id").delete(isLoggedIn, deleteBlog);
router.route("/get").get(isLoggedIn, getBlogs);
router.route("/search/:title").get(isLoggedIn, getBlogsByTitle);

module.exports = router;