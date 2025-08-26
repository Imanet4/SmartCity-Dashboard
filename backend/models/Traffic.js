const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
  city: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  congestionLevel: { 
    type: String, 
    enum: ['low', 'moderate', 'heavy', 'severe'],
    required: true 
  },
  averageSpeed: { type: Number },
  incidentType: { 
    type: String, 
    enum: ['accident', 'construction', 'road_closed', 'event', 'other'] 
  },
  description: { type: String },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Traffic', trafficSchema);