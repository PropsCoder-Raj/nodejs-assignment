const Posts = require("../models/post");
const BigPromise = require("../middleware/BigPromise");
const { getBase64ToSecureUrl } = require("../util/cloudnary");

// Create a new post
exports.createPost = BigPromise(async (req, res, next) => {
    const { title, desc, img } = req.body;
    // console.log(req, "req.body");

    if (!title) {
        return next(new Error("Please enter post title"));
    }

    if (!desc) {
        return next(new Error("Please enter post description"));
    }

    if (!img) {
        return next(new Error("Please enter post image"));
    }

    const updateImg = await getBase64ToSecureUrl(img);

    const post = await Posts.create({
        title,
        desc,
        img: updateImg,
        userId: req.user._id
    });

    return res.status(200).send({ success: true, message: "Create Posts successfully.", post: post });
});

// Get all Posts
exports.getPosts = BigPromise(async (req, res, next) => {
    const posts = await Posts.find({ userId: req.user._id });
    return res.status(200).send({ success: true, message: "Get all Posts successfully.", data: posts, count: posts.length });
});

// Update post
exports.updatePost = BigPromise(async (req, res, next) => {
    const { title, desc, img } = req.body;
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Post _id"));
    }

    if(img){
        req.body.img = await getBase64ToSecureUrl(img); 
    }

    const ispost = await Posts.findOne({ _id: _id, userId: req.user._id })
    if(!ispost){
        return res.status(404).send({ success: false, message: "Post not found." });
    }

    const post = await Posts.findOneAndUpdate({ _id: _id }, { $set: req.body }, { new: true });
    return res.status(200).send({ success: true, message: "Update post successfully.", data: post });
});

// Delete post
exports.deletePost = BigPromise(async (req, res, next) => {
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Post _id"));
    }

    const ispost = await Posts.findOne({ _id: _id, userId: req.user._id })
    if(!ispost){
        return res.status(404).send({ success: false, message: "Post not found." });
    }

    const post = await Posts.findOneAndDelete({ _id: _id });
    return res.status(200).send({ success: true, message: "Delete post successfully.", data: post });
});