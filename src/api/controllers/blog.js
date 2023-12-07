const Blogs = require("../models/blogs");
const BigPromise = require("../middleware/BigPromise");
const { uploadImageBase64 } = require("../util/awsSDK");

// Create a new Blog
exports.createBlog = BigPromise(async (req, res, next) => {
    const { title, desc, img } = req.body;
    // console.log(req, "req.body");

    if (!title) {
        return next(new Error("Please enter blog title"));
    }

    if (!desc) {
        return next(new Error("Please enter blog description"));
    }

    if (!img) {
        return next(new Error("Please enter blog image"));
    }

    const imgUrl = await uploadImageBase64(img);
    if(!imgUrl.status){
        return next(new Error("Please enter blog image as base 64 format."));
    }
    img = imgUrl.location;

    const blog = await Blogs.create({
        title,
        desc,
        img
    });

    return res.status(200).send({ success: true, message: "Create Blogs successfully.", blog: blog });
});

// Get all Blogs
exports.getBlogs = BigPromise(async (req, res, next) => {
    const blogs = await Blogs.find();
    return res.status(200).send({ success: true, message: "Get all Blogs successfully.", data: blogs, count: blogs.length });
});

// Get Blogs By Title
exports.getBlogsByTitle = BigPromise(async (req, res, next) => {
    const blogs = await Blogs.find({ title: { $regex: req.params.title, $options: 'i' } });
    return res.status(200).send({ success: true, message: "Get all Blogs successfully.", data: blogs, count: blogs.length });
})

// Update Blog
exports.updateBlog = BigPromise(async (req, res, next) => {
    const { title, desc, img } = req.body;
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Blog _id"));
    }

    const isBlog = await Blogs.findOne({ _id: _id })
    if(!isBlog){
        return res.status(404).send({ success: false, message: "Blog not found." });
    }

    if(img){
        const imgUrl = await uploadImageBase64(img);
        if(!imgUrl.status){
            return next(new Error("Please enter blog image as base 64 format."));
        } 
        req.body.img = imgUrl.location
    }

    const blog = await Blogs.findOneAndUpdate({ _id: _id }, { $set: req.body }, { new: true });
    return res.status(200).send({ success: true, message: "Update Blog successfully.", data: blog });
});

// Delete Blog
exports.deleteBlog = BigPromise(async (req, res, next) => {
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Blog _id"));
    }

    const blog = await Blogs.findOneAndDelete({ _id: _id });
    return res.status(200).send({ success: true, message: "Delete Blog successfully.", data: blog });
});