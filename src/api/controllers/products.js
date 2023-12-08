const Product = require("../models/products");
const BigPromise = require("../middleware/BigPromise");

// Create a new Product
exports.createProduct = BigPromise(async (req, res, next) => {
    const { name, categoryName, currencyIso, price } = req.body;
    // console.log(req, "req.body");

    if (!name) {
        return next(new Error("Please enter Name"));
    }

    if (!categoryName) {
        return next(new Error("Please enter Category Name"));
    }

    if (!currencyIso) {
        return next(new Error("Please enter Currency ISO Format"));
    }

    if (!price) {
        return next(new Error("Please enter price"));
    }

    const product = await Product.create({
        name,
        categoryName,
        currencyIso,
        price
    });

    return res.status(200).send({ success: true, message: "Create Product successfully.", product: product });
});

// Get all Product
exports.getProduct = BigPromise(async (req, res, next) => {
    const product = await Product.find();
    return res.status(200).send({ success: true, message: "Get all Product successfully.", data: product, count: product.length });
});

// Get Product By Title OR Category
exports.getProductAllFields = BigPromise(async (req, res, next) => {
    const { search } = req.query;
    console.log("parseFloat(search): ", parseFloat(search))
    const product = await Product.find({ $or: [
        { name: { $regex: search, $options: 'i' }},
        { categoryName: { $regex: search, $options: 'i' }},
        { currencyIso: { $regex: search, $options: 'i' }},
        { price: { $eq: !isNaN(parseFloat(search)) ? parseFloat(search) : 0 }}
    ]});
    return res.status(200).send({ success: true, message: "Get all Product successfully.", data: product, count: product.length });
})

// Update Product
exports.updateProduct = BigPromise(async (req, res, next) => {
    const { name, categoryName, currencyIso, price } = req.body;
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Product _id"));
    }

    const isProduct = await Product.findOne({ _id: _id })
    if(!isProduct){
        return res.status(404).send({ success: false, message: "Product not found." });
    }

    const product = await Product.findOneAndUpdate({ _id: _id }, { $set: req.body }, { new: true });
    return res.status(200).send({ success: true, message: "Update Product successfully.", data: product });
});

// Delete Product
exports.deleteProduct = BigPromise(async (req, res, next) => {
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Product _id"));
    }

    const isProduct = await Product.findOne({ _id: _id })
    if(!isProduct){
        return res.status(404).send({ success: false, message: "Product not found." });
    }

    const product = await Product.findOneAndDelete({ _id: _id });
    return res.status(200).send({ success: true, message: "Delete Product successfully.", data: product });
});