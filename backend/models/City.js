const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    coordinates: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    },
    zoomLevel: { type: Number, default: 12 },
    weatherData: { type: mongoose.Schema.Types.ObjectId, ref: 'Weather' },
    trafficData: { type: mongoose.Schema.Types.ObjectId, ref: 'Traffic' },
    alertsData: { type: mongoose.Schema.Types.ObjectId, ref: 'Alert' },
    eventsData: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
}, {
    timestamps: true
});

module.exports = mongoose.model('City', citySchema);