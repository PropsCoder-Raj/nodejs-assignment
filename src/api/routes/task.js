const express = require("express");
const {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getTaskByStatus
} = require("../controllers/task");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(isLoggedIn, createTask);
router.route("/update/:_id").put(isLoggedIn, updateTask);
router.route("/delete/:_id").delete(isLoggedIn, deleteTask);
router.route("/get").get(isLoggedIn, getTask);
router.route("/search").get(isLoggedIn, getTaskByStatus);

module.exports = router;