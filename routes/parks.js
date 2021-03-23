const express = require("express");
const { getParks, addPark } = require("../controllers/parks");

const router = express.Router();

router.route("/").get(getParks).post(addPark);

module.exports = router;
