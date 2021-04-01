const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const ParkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
    formattedAddress: String,
  },
  photos: [String],
  features: [
    {
      feature: {
        type: String,
        enum: [
          "Basketball court",
          "Tennis court",
          "Baseball field",
          "Soccer field",
          "Football field",
          "Track",
          "Dog park",
          "Playground",
        ],
        required: true,
      },
      _id: false,
    },
  ],
});

// Geocode and create GeoJSON location
ParkSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };

  // Do not save address
  // this.address = undefined;
  next();
});

ParkSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Park", ParkSchema);
