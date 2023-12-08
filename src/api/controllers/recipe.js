const Recipe = require("../models/recipes");
const BigPromise = require("../middleware/BigPromise");

// Create a new Recipe
exports.createRecipe = BigPromise(async (req, res, next) => {
    const { title, instructions, ingredients } = req.body;
    // console.log(req, "req.body");

    if (!title) {
        return next(new Error("Please enter Recipe title"));
    }

    if (!instructions) {
        return next(new Error("Please enter Recipe instructions"));
    }

    if (!ingredients) {
        return next(new Error("Please enter Ingredients"));
    }

    const recipe = await Recipe.create({
        title,
        instructions,
        ingredients
    });

    return res.status(200).send({ success: true, message: "Create Recipe successfully.", recipe: recipe });
});

// Get all Recipe
exports.getRecipe = BigPromise(async (req, res, next) => {
    const recipe = await Recipe.find();
    return res.status(200).send({ success: true, message: "Get all Recipe successfully.", data: recipe, count: recipe.length });
});

// Get Recipe By Title OR Ingradients
exports.getRecipeByTitleORIngradients = BigPromise(async (req, res, next) => {
    const recipe = await Recipe.find({ $or: [{ title: { $regex: req.query.title ? req.query.title : "", $options: 'i' }  }, { ingredients: { $elemMatch: { $regex: req.query.ingredient ? req.query.ingredient : "", $options: 'i' } } } ] });
    return res.status(200).send({ success: true, message: "Get all Recipe successfully.", data: recipe, count: recipe.length });
})

// Update Recipe
exports.updateRecipe = BigPromise(async (req, res, next) => {
    const { title, desc, category } = req.body;
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Recipe _id"));
    }

    const isRecipe = await Recipe.findOne({ _id: _id })
    if(!isRecipe){
        return res.status(404).send({ success: false, message: "Recipe not found." });
    }

    const recipe = await Recipe.findOneAndUpdate({ _id: _id }, { $set: req.body }, { new: true });
    return res.status(200).send({ success: true, message: "Update Recipe successfully.", data: recipe });
});

// Delete Recipe
exports.deleteRecipe = BigPromise(async (req, res, next) => {
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Recipe _id"));
    }
    
    const isRecipe = await Recipe.findOne({ _id: _id })
    if(!isRecipe){
        return res.status(404).send({ success: false, message: "Recipe not found." });
    }

    const recipe = await Recipe.findOneAndDelete({ _id: _id });
    return res.status(200).send({ success: true, message: "Delete Recipe successfully.", data: recipe });
});