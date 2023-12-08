const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a task name"],
        unique: true,
    },
    status: {
        type: String,
        required: [true, "Please provide status"],
        enum: {
            values: ["incomplete", "inprogress", "completed"],
            message: "Invalid status. Accepted values are 'incomplete', 'inprogress', or 'completed'."
        },
        default: "inprogress",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("task", taskSchema);