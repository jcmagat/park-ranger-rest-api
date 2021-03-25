const express = require("express");
const {
  getParks,
  addPark,
  getParksNearby,
  getParkById,
  addFeature,
} = require("../controllers/parks");

const router = express.Router();

router.route("/").get(getParks).post(addPark);
router.route("/nearby").get(getParksNearby);
router.route("/:id").get(getParkById).put(addFeature);

module.exports = router;
