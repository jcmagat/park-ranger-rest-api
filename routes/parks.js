const express = require("express");
const multer = require("multer");
const {
  getParks,
  addPark,
  getParksNearby,
  getParkById,
  addFeature,
} = require("../controllers/parks");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 16, // 16 MB
  },
  fileFilter: fileFilter,
});

router.route("/").get(getParks);
router.route("/").all(upload.single("photo")).post(addPark);

router.route("/nearby").get(getParksNearby);

router.route("/:id").get(getParkById).put(addFeature);

module.exports = router;
