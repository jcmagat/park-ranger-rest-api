const express = require("express");
const upload = require("../controllers/upload");
const {
  getParks,
  addPark,
  getParksNearby,
  getParksByName,
  getParkById,
  addFeature,
  addPhoto,
  getPhoto,
} = require("../controllers/parks");

const router = express.Router();

router.route("/").get(getParks).post(addPark);

router.route("/nearby").get(getParksNearby);

router.route("/search").get(getParksByName);

router.route("/:id").get(getParkById);

router.route("/:id/features").put(addFeature);

router.route("/:id/photos").all(upload).put(addPhoto);

router.route("/photos/:key").get(getPhoto);

module.exports = router;
