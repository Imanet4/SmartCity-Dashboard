const express = require('express');
const trafficController = require('../controllers/trafficController');
const authController = require('../controllers/authController');
const { alertValidation } = require('../utils/validation');

const router = express.Router();

//Public routes
router.get('/:city', trafficController.getTrafficIncidents);
router.get('/nearby/location', trafficController.getTrafficNearLocation);

//Protected routes (admin only)
router.use(authController.protect, authController.restrictTo('admin'));
router.post('/', alertValidation, trafficController.createTrafficIncident);
router.patch('/:id', alertValidation, trafficController.updateTrafficIncident);

module.exports = router;