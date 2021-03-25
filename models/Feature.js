const mongoose = require("mongoose");

const FeatureSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Feature", FeatureSchema);
