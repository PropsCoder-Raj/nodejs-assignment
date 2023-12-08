const mongoose = require("mongoose");
const { getRecipeData } = require("../util/thirdPartyData");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a recipe title"],
    unique: true,
  },
  instructions: {
    type: String,
    required: [true, "Please provide a recipe instructions"],
  },
  ingredients: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("recipe", recipeSchema);

(async () => {
    try {
      const result = await mongoose.model("recipe", recipeSchema).find();
      if (result.length != 0) {
        console.log("Recipe Data Founded 😀.");
      } else {
        const recipe = await getRecipeData();
        if(recipe.status){
          const data = recipe.data.d.map((element) => {
            return { title: element.Title, ingredients: Object.values(element.Ingredients), instructions: element.Instructions }
          })
          await mongoose.model("recipe", recipeSchema).insertMany(data);
          console.log("Recipe Inserted 😀.");
        }
      }
    } catch (error) {
      console.log("Recipe Sections error===>>", error);
    }
  }).call();