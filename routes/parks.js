const express = require("express");
const { getParks, addPark, fetchParksNearby } = require("../controllers/parks");

const router = express.Router();

router.route("/").get(getParks).post(addPark);
router.route("/nearby").post(fetchParksNearby);

module.exports = router;
