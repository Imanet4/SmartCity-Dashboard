const express = require('express');
const weatherController = require('../controllers/weatherController');
const authController = require('../controllers/authController');
const { weatherValidation } = require('../utils/validation')

const router = express.Router();

router.get('/:city', weatherValidation, weatherController.getCurrentWeather);
router.get('/history/:city', weatherValidation, weatherController.getWeatherHistory);

//Protected routes (admin only)
router.use(authController.protect, authController.restrictTo('admin'));


module.exports = router;