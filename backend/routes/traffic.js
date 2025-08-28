const express = require('express');
const {
  getTrafficIncidents,
  getTrafficNearLocation,
  createTrafficIncident,
  updateTrafficIncident
} = require('../controllers/trafficController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { alertValidation } = require('../utils/validation');

const router = express.Router();

//Public routes
router.get('/:city', getTrafficIncidents);
router.get('/nearby/location', getTrafficNearLocation);

//Protected routes (admin only)
router.use(protect, restrictTo('admin'));
router.post('/', alertValidation, createTrafficIncident);
router.put('/:id', alertValidation, updateTrafficIncident);

module.exports = router;