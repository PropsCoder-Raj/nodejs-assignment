const mongoose = require("mongoose");
const { getBlogPosts } = require("../util/thirdPartyData");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a blog title"],
    maxlength: [100, "Blog title should be under 100 characters"],
    unique: true,
  },
  desc: {
    type: String,
    required: [true, "Please provide an blog description"],
  },
  img: {
    type: String,
    required: [true, "Please provide an blog image"],
    select: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Blogs", blogSchema);

(async () => {
  try {
    const result = await mongoose.model("Blogs", blogSchema).find();
    if (result.length != 0) {
      console.log("Blogs Data Founded 😀.");
    } else {
      const blog = await getBlogPosts();
      if(blog.status){
        const data = blog.data.results.map((element) => {
          return { title: element.title, desc: element.body, img: element.image }
        })
        await mongoose.model("Blogs", blogSchema).insertMany(data);
        console.log("Blogs Inserted 😀.");
      }
    }
  } catch (error) {
    console.log("Blogs Sections error===>>", error);
  }
}).call();