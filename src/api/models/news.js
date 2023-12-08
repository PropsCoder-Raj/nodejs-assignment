const mongoose = require("mongoose");
const { getNewsData } = require("../util/thirdPartyData");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a news title"],
    unique: true,
  },
  desc: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "Please provide an category name"],
  },
  publishedAt: {
    type: Date,
    default: new Date(),
    required: [true, "Please provide an news description"],
  }
}, { timestamps: true });

module.exports = mongoose.model("news", newsSchema);

(async () => {
    try {
      const result = await mongoose.model("news", newsSchema).find();
      if (result.length != 0) {
        console.log("News Data Founded 😀.");
      } else {
        const news = await getNewsData('sport');
        if(news.status){
          const data = news.data.map((element) => {
            return { title: element.title, desc: element.body, publishedAt: new Date(element.publishedAt), category: 'sport' }
          })
          await mongoose.model("news", newsSchema).insertMany(data);
          console.log("News Inserted 😀.");
        }
      }
    } catch (error) {
      console.log("News Sections error===>>", error);
    }
  }).call();