const mongoose = require('mongoose');

const ParkSchema = mongoose.Schema({
  name: String,
  location: String,
  hours: String,
  photos: String,
  features: [Feature],
  ratings: [Rating]
});

module.exports = mongoose.model('Park', ParkSchema);
