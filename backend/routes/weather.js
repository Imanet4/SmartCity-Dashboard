const express = require('express');
const weatherController = require('../controllers/weatherController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { weatherValidation } = require('../utils/validation')

const router = express.Router();

router.get('/:city', weatherValidation, weatherController.getCurrentWeather);
router.get('/history/:city', weatherValidation, weatherController.getWeatherHistory);

//Protected routes (admin only)
router.use(protect, restrictTo('admin'));


module.exports = router;