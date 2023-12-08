const express = require("express");
const {
    createEstate,
    getEstate,
    updateEstate,
    deleteEstate,
    getEstateAllFields
} = require("../controllers/estate");
const { isLoggedIn } = require("../middleware/user");
const router = express.Router();

router.route("/create").post(isLoggedIn, createEstate);
router.route("/update/:_id").put(isLoggedIn, updateEstate);
router.route("/delete/:_id").delete(isLoggedIn, deleteEstate);
router.route("/get").get(isLoggedIn, getEstate);
router.route("/search").get(isLoggedIn, getEstateAllFields);

module.exports = router;