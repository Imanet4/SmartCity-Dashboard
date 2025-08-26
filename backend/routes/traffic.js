const express = require('express');
const {
  getTrafficIncidents,
  getTrafficNearLocation,
  createTrafficIncident,
  updateTrafficIncident
} = require('../controllers/trafficController');
const authController = require('../controllers/authController');
const { alertValidation } = require('../utils/validation');

const router = express.Router();

//Public routes
router.get('/:city', getTrafficIncidents);
router.get('/nearby/location', getTrafficNearLocation);

//Protected routes (admin only)
router.use(authController.protect, authController.restrictTo('admin'));
router.post('/', alertValidation, createTrafficIncident);
router.patch('/:id', alertValidation, updateTrafficIncident);

module.exports = router;