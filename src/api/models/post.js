const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a post title"],
        unique: true,
    },
    desc: {
        type: String,
        required: [true, "Please provide an post description"],
    },
    img: {
        type: String,
        required: [true, "Please provide an post image"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Posts", postSchema);