const Movies = require("../models/movies");
const BigPromise = require("../middleware/BigPromise");

// Create a new Movies
exports.createMovies = BigPromise(async (req, res, next) => {
    const { title, genre, director } = req.body;
    // console.log(req, "req.body");

    if (!title) {
        return next(new Error("Please enter Title"));
    }

    if (!genre) {
        return next(new Error("Please enter Genre"));
    }

    if (!director) {
        return next(new Error("Please enter Director"));
    }

    const movies = await Movies.create({
        title,
        genre,
        director
    });

    return res.status(200).send({ success: true, message: "Create Movies successfully.", movies: movies });
});

// Get all Movies
exports.getMovies = BigPromise(async (req, res, next) => {
    const movies = await Movies.find();
    return res.status(200).send({ success: true, message: "Get all Movies successfully.", data: movies, count: movies.length });
});

// Get Movies By Title OR Category
exports.getMoviesAllFields = BigPromise(async (req, res, next) => {
    const { search } = req.query;
    const movies = await Movies.find({ $or: [
        { title: { $regex: search, $options: 'i' }},
        { genre: { $elemMatch: { $regex: search, $options: 'i' } }},
        { director: { $regex: search, $options: 'i' }}
    ]});
    return res.status(200).send({ success: true, message: "Get all Movies successfully.", data: movies, count: movies.length });
})

// Update Movies
exports.updateMovies = BigPromise(async (req, res, next) => {
    const { title, genre, director } = req.body;
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Movies _id"));
    }

    const isMovies = await Movies.findOne({ _id: _id })
    if(!isMovies){
        return res.status(404).send({ success: false, message: "Movies not found." });
    }

    const movies = await Movies.findOneAndUpdate({ _id: _id }, { $set: req.body }, { new: true });
    return res.status(200).send({ success: true, message: "Update Movies successfully.", data: movies });
});

// Delete Movies
exports.deleteMovies = BigPromise(async (req, res, next) => {
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Movies _id"));
    }

    const isMovies = await Movies.findOne({ _id: _id })
    if(!isMovies){
        return res.status(404).send({ success: false, message: "Movies not found." });
    }

    const movies = await Movies.findOneAndDelete({ _id: _id });
    return res.status(200).send({ success: true, message: "Delete Movies successfully.", data: movies });
});