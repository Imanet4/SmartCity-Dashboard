const express = require('express');
const weatherController = require('../controllers/weatherController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/:city', weatherController.getCurrentWeather);
router.get('/history/:city', weatherController.getWeatherHistory);

//Protected routes (admin only)
router.use(authController.protect, authController.restrictTo('admin'));

//Additional admin-only weather routes can be added here

module.exports = router;