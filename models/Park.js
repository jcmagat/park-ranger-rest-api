const mongoose = require("mongoose");

const ParkSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Park", ParkSchema);
