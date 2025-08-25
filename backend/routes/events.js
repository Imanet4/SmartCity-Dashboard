const express = require('express');
const eventController = require('../controllers/eventsController');
const authController = require('../controllers/authController');
const { eventValidation } = require('../utils/validation');

const router = express.Router();

//Public routes
router.get('/:city', eventController.getEvents);
router.get('/single/:id', eventController.getEvent);

//Protected routes (admin only)
router.use(authController.protect, authController.restrictTo('admin'));
router.post('/', eventValidation, eventController.createEvent);
router.patch('/:id', eventValidation, eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;