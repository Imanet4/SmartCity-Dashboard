const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
  city: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: {
    type: {
      type: String, //Defining the GeoJSON type
      enum: ['Point'], //This must be point for coordinates
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number], //Array of numbers: [longitude, latitude]
      required: true
    }
    
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