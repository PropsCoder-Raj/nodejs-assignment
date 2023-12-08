const Task = require("../models/task");
const BigPromise = require("../middleware/BigPromise");

// Create a new Task
exports.createTask = BigPromise(async (req, res, next) => {
    const { name } = req.body;
    // console.log(req, "req.body");

    if (!name) {
        return next(new Error("Please enter Task name"));
    }

    const task = await Task.create({
        name,
        userId: req.user._id
    });

    return res.status(200).send({ success: true, message: "Create Task successfully.", task: task });
});

// Get all Task
exports.getTask = BigPromise(async (req, res, next) => {
    const task = await Task.find({ userId: req.user._id });
    return res.status(200).send({ success: true, message: "Get all Task successfully.", data: task, count: task.length });
});

// Get Task By Filter Wise
exports.getTaskByStatus = BigPromise(async (req, res, next) => {
    const task = await Task.find({ status: { $regex: req.query.status ? req.query.status : "", $options: 'i' }, userId: req.user._id});
    return res.status(200).send({ success: true, message: "Get all Task successfully.", data: task, count: task.length });
})

// Update Task
exports.updateTask = BigPromise(async (req, res, next) => {
    const { name, status } = req.body;
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Task _id"));
    }

    if(status && status != "incomplete" && status != "inprogress" && status != "completed"){
        return next(new Error("Invalid status. Accepted values are 'incomplete', 'inprogress', or 'completed'."));
    }

    const isTask = await Task.findOne({ _id: _id, userId: req.user.id })
    if(!isTask){
        return res.status(404).send({ success: false, message: "Task not found." });
    }

    const task = await Task.findOneAndUpdate({ _id: _id }, { $set: req.body }, { new: true });
    return res.status(200).send({ success: true, message: "Update Task successfully.", data: task });
});

// Delete Task
exports.deleteTask = BigPromise(async (req, res, next) => {
    const { _id } = req.params;

    if (!_id) {
        return next(new Error("Please enter Task _id"));
    }

    const isTask = await Task.findOne({ _id: _id, userId: req.user.id })
    if(!isTask){
        return res.status(404).send({ success: false, message: "Task not found." });
    }

    const task = await Task.findOneAndDelete({ _id: _id });
    return res.status(200).send({ success: true, message: "Delete Task successfully.", data: task });
});