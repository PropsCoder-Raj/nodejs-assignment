const Estate = require("../models/realEstate");
const BigPromise = require("../middleware/BigPromise");

// Create a new Estate
exports.createEstate = BigPromise(async (req, res, next) => {
    const { location, type, addresstype, eclass, osm_id } = req.body;
    // console.log(req, "req.body");

    if (!location) {
        return next(new Error("Please enter estate location"));
    }

    if (!type) {
        return next(new Error("Please enter estate type"));
    }

    if (!addresstype) {
        return next(new Error("Please enter estate addresstype"));
    }

    if (!eclass) {
        return next(new Error("Please enter estate class"));
    }

    if (!osm_id) {
        return next(new Error("Please enter estate osm id"));
    }

    const estate = await Estate.create({
        location,
        type,
        addresstype,
        eclass,
        osm_id
    });

    return res.status(200).send({ success: true, message: "Create Estate successfully.", estate: estate });
});

// Get all Estate
exports.getEstate = BigPromise(async (req, res, next) => {
    const estate = await Estate.find();
    return res.status(200).send({ success: true, message: "Get all Estate successfully.", data: estate, count: estate.length });
});

// Get Estate By location OR Category
exports.getEstateAllFields = BigPromise(async (req, res, next) => {
    const { search } = req.query;
    const estate = await Estate.find({ $or: [
        { location: { $regex: search, $options: 'i' }},
        { type: { $elemMatch: { $regex: search, $options: 'i' } }},
        { addresstype: { $regex: search, $options: 'i' }},
        { eclass: { $regex: search, $options: 'i' }},
        { osm_id: { $regex: search, $options: 'i' }},
    ]});
    return res.status(200).send({ success: true, message: "Get all Estate successfully.", data: estate, count: estate.length });
})

// Update Estate
exports.updateEstate = BigPromise(async (req, res, next) => {
    const { location, type, addresstype, eclass, osm_id } = req.body;
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Estate _id"));
    }

    const isEstate = await Estate.findOne({ _id: _id })
    if(!isEstate){
        return res.status(404).send({ success: false, message: "Estate not found." });
    }

    const estate = await Estate.findOneAndUpdate({ _id: _id }, { $set: req.body }, { new: true });
    return res.status(200).send({ success: true, message: "Update Estate successfully.", data: estate });
});

// Delete Estate
exports.deleteEstate = BigPromise(async (req, res, next) => {
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Estate _id"));
    }

    const isEstate = await Estate.findOne({ _id: _id })
    if(!isEstate){
        return res.status(404).send({ success: false, message: "Estate not found." });
    }

    const estate = await Estate.findOneAndDelete({ _id: _id });
    return res.status(200).send({ success: true, message: "Delete Estate successfully.", data: estate });
});