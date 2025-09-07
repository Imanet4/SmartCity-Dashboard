const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number },
  windSpeed: { type: Number },
  conditions: { type: String },
  airQuality: { type: Number, enum: ['Good', 'Moderate', 'Unhealthy', 'Very Unhealthy', 'Hazardous'] },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', weatherSchema);