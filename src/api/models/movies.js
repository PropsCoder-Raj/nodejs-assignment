const mongoose = require("mongoose");
const { getMoviesData } = require("../util/thirdPartyData");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a movie title"],
    unique: true,
  },
  genre: [
    {
        type: String,
    }
  ],
  director: {
    type: String,
    required: [true, "Please provide a movie director"],
  },
}, { timestamps: true });

module.exports = mongoose.model("movies", movieSchema);

(async () => {
    try {
        const result = await mongoose.model("movies", movieSchema).find();
        if (result.length != 0) {
            console.log("Movies Data Founded 😀.");
        } else {
            const movies = await getMoviesData();
            if (movies.status) {
                const data = movies.data;
                await mongoose.model("movies", movieSchema).create({
                    title: data.Title,
                    genre: data.Genre.split(', '),
                    director: data.Director,
                });
                console.log("Movies Inserted 😀.");
            }
        }
    } catch (error) {
        console.log("Movies Sections error===>>", error);
    }
}).call();