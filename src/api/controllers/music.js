const Music = require("../models/music");
const BigPromise = require("../middleware/BigPromise");

// Create a new Music
exports.createMusic = BigPromise(async (req, res, next) => {
    const { albumName, source, artistNames, track } = req.body;
    // console.log(req, "req.body");

    if (!albumName) {
        return next(new Error("Please enter Album Name"));
    }

    if (!source) {
        return next(new Error("Please enter Source"));
    }

    if (!artistNames) {
        return next(new Error("Please enter Artist Names"));
    }

    if (!track) {
        return next(new Error("Please enter Track"));
    }

    const music = await Music.create({
        albumName,
        source,
        artistNames,
        track
    });

    return res.status(200).send({ success: true, message: "Create Music successfully.", music: music });
});

// Get all Music
exports.getMusic = BigPromise(async (req, res, next) => {
    const music = await Music.find();
    return res.status(200).send({ success: true, message: "Get all Music successfully.", data: music, count: music.length });
});

// Get Music By Title OR Category
exports.getMusicAllFields = BigPromise(async (req, res, next) => {
    const { albumName, source, artistNames, track } = req.query;
    const music = await Music.find({ $or: [
        { albumName: { $regex: albumName ? albumName : "", $options: 'i' }},
        { source: { $regex: source ? source : "", $options: 'i' }},
        { artistNames: { $regex: artistNames ? artistNames : "", $options: 'i' }},
        { track: { $regex: track ? track : "", $options: 'i' }}
    ]});
    return res.status(200).send({ success: true, message: "Get all Music successfully.", data: music, count: music.length });
})

// Update Music
exports.updateMusic = BigPromise(async (req, res, next) => {
    const { albumName, source, artistNames, track } = req.body;
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Music _id"));
    }

    const isMusic = await Music.findOne({ _id: _id })
    if(!isMusic){
        return res.status(404).send({ success: false, message: "Music not found." });
    }

    const music = await Music.findOneAndUpdate({ _id: _id }, { $set: req.body }, { new: true });
    return res.status(200).send({ success: true, message: "Update Music successfully.", data: music });
});

// Delete Music
exports.deleteMusic = BigPromise(async (req, res, next) => {
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Music _id"));
    }

    const isMusic = await Music.findOne({ _id: _id })
    if(!isMusic){
        return res.status(404).send({ success: false, message: "Music not found." });
    }

    const music = await Music.findOneAndDelete({ _id: _id });
    return res.status(200).send({ success: true, message: "Delete Music successfully.", data: music });
});