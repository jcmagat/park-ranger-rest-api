const express = require("express");
const {
  getParks,
  addPark,
  fetchParksNearby,
  addFeature,
} = require("../controllers/parks");

const router = express.Router();

router.route("/").get(getParks).post(addPark);
router.route("/nearby").post(fetchParksNearby);
router.route("/:id").put(addFeature);

module.exports = router;
