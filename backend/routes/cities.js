const express = require('express');
const router = express.Router();
const {
  getCityWeather,
  getCityTraffic,
  getCityAlerts,
  getCityEvents,
  getCityDetails
} = require('../controllers/cityController');

// GET weather for a specific city
router.get('/:cityName/weather', getCityWeather);

// GET traffic for a specific city
router.get('/:cityName/traffic', getCityTraffic);

// GET alerts for a specific city
router.get('/:cityName/alerts', getCityAlerts);

// GET events for a specific city
router.get('/:cityName/events', getCityEvents);

// GET city details (coordinates, zoom level)
router.get('/:cityName', getCityDetails);

module.exports = router;