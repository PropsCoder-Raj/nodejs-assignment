const mongoose = require("mongoose");
const { getProductsData } = require("../util/thirdPartyData");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a product name"],
    },
    categoryName: {
        type: String,
        required: [true, "Please provide an Category Name"],
    },
    currencyIso: {
        type: String,
        required: [true, "Please provide an Currency Iso"],
    },
    price: {
        type: Number,
        required: [true, "Please provide an price"],
    }
}, { timestamps: true });

module.exports = mongoose.model("product", productSchema);

(async () => {
    try {
      const result = await mongoose.model("product", productSchema).find();
      if (result.length != 0) {
        console.log("Product Data Founded 😀.");
      } else {
        const products = await getProductsData('men_all');
        if(products.status){
          const data = products.data.results.map((element) => {
            return { name: element.name, categoryName: element.categoryName, currencyIso: element.price.currencyIso, price: element.price.value }
          })
          await mongoose.model("product", productSchema).insertMany(data);
          console.log("Product Inserted 😀.");
        }
      }
    } catch (error) {
      console.log("Product Sections error===>>", error);
    }
  }).call();