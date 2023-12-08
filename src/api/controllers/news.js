const News = require("../models/news");
const BigPromise = require("../middleware/BigPromise");

// Create a new News
exports.createNews = BigPromise(async (req, res, next) => {
    const { title, desc, category } = req.body;
    // console.log(req, "req.body");

    if (!title) {
        return next(new Error("Please enter News title"));
    }

    if (!desc) {
        return next(new Error("Please enter News description"));
    }

    if (!category) {
        return next(new Error("Please enter Category"));
    }

    const news = await News.create({
        title,
        desc,
        category
    });

    return res.status(200).send({ success: true, message: "Create News successfully.", news: news });
});

// Get all News
exports.getNews = BigPromise(async (req, res, next) => {
    const news = await News.find();
    return res.status(200).send({ success: true, message: "Get all News successfully.", data: news, count: news.length });
});

// Get News By Title OR Category
exports.getNewsByTitleORCategory = BigPromise(async (req, res, next) => {
    const news = await News.find({ $or: [{ title: { $regex: req.query.title ? req.query.title : "", $options: 'i' }  }, { category: req.query.category ? req.query.category : "" }] });
    return res.status(200).send({ success: true, message: "Get all News successfully.", data: news, count: news.length });
})

// Update News
exports.updateNews = BigPromise(async (req, res, next) => {
    const { title, desc, category } = req.body;
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter News _id"));
    }

    const isNews = await News.findOne({ _id: _id })
    if(!isNews){
        return res.status(404).send({ success: false, message: "News not found." });
    }

    const news = await News.findOneAndUpdate({ _id: _id }, { $set: req.body }, { new: true });
    return res.status(200).send({ success: true, message: "Update News successfully.", data: news });
});

// Delete News
exports.deleteNews = BigPromise(async (req, res, next) => {
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter News _id"));
    }
    
    const isNews = await News.findOne({ _id: _id })
    if(!isNews){
        return res.status(404).send({ success: false, message: "News not found." });
    }

    const news = await News.findOneAndDelete({ _id: _id });
    return res.status(200).send({ success: true, message: "Delete News successfully.", data: news });
});