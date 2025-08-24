const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  city: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    enum: ['festival', 'sports', 'culture', 'music', 'other'],
    required: true
  },
  location: { type: String, required: true },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  organizer: { type: String },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);