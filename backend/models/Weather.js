const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number },
  windSpeed: { type: Number },
  conditions: { type: String },
  airQuality: { type: Number },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', weatherSchema);