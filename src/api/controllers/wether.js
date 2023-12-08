const Wether = require("../models/wether");
const BigPromise = require("../middleware/BigPromise");

// Create a new Wether
exports.createWether = BigPromise(async (req, res, next) => {
    const { location, region, temp_c, temp_f, wind_degree } = req.body;
    // console.log(req, "req.body");

    if (!location) {
        return next(new Error("Please enter Wether location"));
    }

    if (!region) {
        return next(new Error("Please enter Wether region"));
    }

    if (!temp_c) {
        return next(new Error("Please enter Wether temp c"));
    }

    if (!temp_f) {
        return next(new Error("Please enter Wether temp f"));
    }

    if (!wind_degree) {
        return next(new Error("Please enter Wether wind degree"));
    }

    const wether = await Wether.create({
        location,
        region,
        temp_c,
        temp_f,
        wind_degree
    });

    return res.status(200).send({ success: true, message: "Create Wether successfully.", wether: wether });
});

// Get all Wether
exports.getWether = BigPromise(async (req, res, next) => {
    const wether = await Wether.find();
    return res.status(200).send({ success: true, message: "Get all Wether successfully.", data: wether, count: wether.length });
});

// Get Wether By location OR Category
exports.getWetherAllFields = BigPromise(async (req, res, next) => {
    const { search } = req.query;
    const wether = await Wether.find({ $or: [
        { location: { $regex: search, $options: 'i' }},
        { region: { $regex: search, $options: 'i' }},
        // { temp_c: { $eq: parseFloat(search) }},
        // { temp_f: { $eq: parseFloat(search) }},
        // { wind_degree: { $eq: parseFloat(search) }},
    ]});
    return res.status(200).send({ success: true, message: "Get all Wether successfully.", data: wether, count: wether.length });
})

// Update Wether
exports.updateWether = BigPromise(async (req, res, next) => {
    const { location, region, temp_c, temp_f, wind_degree } = req.body;
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Wether _id"));
    }

    const isWether = await Wether.findOne({ _id: _id })
    if(!isWether){
        return res.status(404).send({ success: false, message: "Wether not found." });
    }

    const wether = await Wether.findOneAndUpdate({ _id: _id }, { $set: req.body }, { new: true });
    return res.status(200).send({ success: true, message: "Update Wether successfully.", data: wether });
});

// Delete Wether
exports.deleteWether = BigPromise(async (req, res, next) => {
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Wether _id"));
    }

    const isWether = await Wether.findOne({ _id: _id })
    if(!isWether){
        return res.status(404).send({ success: false, message: "Wether not found." });
    }

    const wether = await Wether.findOneAndDelete({ _id: _id });
    return res.status(200).send({ success: true, message: "Delete Wether successfully.", data: wether });
});