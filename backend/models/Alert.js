const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  city: { type: String, required: true },
  type: { type: String, enum: ['traffic', 'safety', 'weather'], required: true },
  severity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  coordinates: {
    lat: { type: Number },
    lon: { type: Number }
  },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);