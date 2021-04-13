const express = require("express");
const upload = require("../controllers/upload");
const {
  getParks,
  addPark,
  getParksNearby,
  getParkById,
  addFeature,
} = require("../controllers/parks");

const router = express.Router();

router.route("/").get(getParks);
router.route("/").all(upload).post(addPark);

router.route("/nearby").get(getParksNearby);

router.route("/:id").get(getParkById).put(addFeature);

module.exports = router;
