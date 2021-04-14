const express = require("express");
const upload = require("../controllers/upload");
const {
  getParks,
  addPark,
  getParksNearby,
  getParkById,
  addFeature,
  addPhoto,
} = require("../controllers/parks");

const router = express.Router();

router.route("/").get(getParks);
router.route("/").all(upload).post(addPark);

router.route("/nearby").get(getParksNearby);

router.route("/:id").get(getParkById);

router.route("/:id/features").put(addFeature);

router.route("/:id/photos").all(upload).put(addPhoto);

module.exports = router;
