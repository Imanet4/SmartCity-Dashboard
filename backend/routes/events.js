const express = require('express');
const eventController = require('../controllers/eventsControllers');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { eventValidation } = require('../utils/validation');

const router = express.Router();

//Public routes
router.get('/:city', eventController.getEvents);
router.get('/single/:id', eventController.getEvent);

//Protected routes (admin only)
router.use(protect, restrictTo('admin'));
router.post('/', eventValidation, eventController.createEvent);
router.put('/:id', eventValidation, eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;