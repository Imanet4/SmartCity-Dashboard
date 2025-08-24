const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    coordinates: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    },
    zoomLevel: { type: Number, default: 12 }
});

module.exports = mongoose.model('City', citySchema);