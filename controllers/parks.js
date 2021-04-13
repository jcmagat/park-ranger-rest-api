const Park = require("../models/Park");

// @desc Get all parks
// @route GET /parks
// @access Public
exports.getParks = async (req, res, next) => {
  try {
    const parks = await Park.find();
    return res.status(200).json({
      success: true,
      count: parks.length,
      data: parks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// TODO: add features
// @desc Add a park
// @route POST /parks
// @access Public
exports.addPark = async (req, res, next) => {
  try {
    const park = await Park.create({
      name: req.body.name,
      address: req.body.address,
      photos: [req.file.key],
    });
    const savedPark = await park.save();
    return res.status(200).json({
      success: true,
      data: savedPark,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Fetch all parks within distance (meters) of longitude, latitude
// @route GET /parks/nearby?long=&lat=&dist=
// @access Public
exports.getParksNearby = async (req, res, next) => {
  try {
    const long = parseFloat(req.query.long);
    const lat = parseFloat(req.query.lat);
    const dist = parseFloat(req.query.dist); // in meters

    const parks = await Park.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [long, lat],
          },
          maxDistance: dist,
          key: "location",
          distanceField: "distance",
        },
      },
    ]).project("name photos distance");

    return res.status(200).json({
      success: true,
      count: parks.length,
      data: parks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Get the park with the specified id
// @route GET /parks/:id
// @access Public
exports.getParkById = async (req, res, next) => {
  try {
    const park = await Park.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: park,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Add a feature to a park
// @route PUT /parks/:id
// @access Public
exports.addFeature = async (req, res, next) => {
  try {
    const updatedPark = await Park.updateOne(
      { _id: req.params.id },
      { $addToSet: { features: req.body } }
    );
    return res.status(200).json({
      success: true,
      data: updatedPark,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Add a photo to a park
//
