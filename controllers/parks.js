const Park = require("../models/Park");
const { getFileStream } = require("./s3");

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

// @desc Add a park
// @route POST /parks
// @access Public
exports.addPark = async (req, res, next) => {
  try {
    const park = await Park.create({
      name: req.body.name,
      address: req.body.address,
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

// @desc Get all parks with the specified name
// @route GET /parks/search?name=
// @access Public
exports.getParksByName = async (req, res, next) => {
  try {
    const input = req.query.name;
    const nameRegex = new RegExp(input, "i");

    const parks = await Park.aggregate([{ $match: { name: nameRegex } }]);
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
// @route PUT /parks/:id/features
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
// @route PUT /parks/:id/photos
// @access Public
exports.addPhoto = async (req, res, next) => {
  try {
    console.log(req.file);
    const updatedPark = await Park.updateOne(
      { _id: req.params.id },
      { $addToSet: { photos: req.file.key } }
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

// @desc Get photo
// @route GET parks/photos/:key
// @access Public
exports.getPhoto = async (req, res, next) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
};
