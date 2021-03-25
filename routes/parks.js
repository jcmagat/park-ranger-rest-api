const express = require("express");
const {
  getParks,
  addPark,
  fetchParksNearby,
  getParkById,
  addFeature,
} = require("../controllers/parks");

const router = express.Router();

router.route("/").get(getParks).post(addPark);
router.route("/nearby").post(fetchParksNearby);
router.route("/:id").get(getParkById).put(addFeature);

module.exports = router;
