const express = require('express');
const alertController = require('../controllers/alertController');
const authController = require('../controllers/authController');

const router = express.Router();

//Public routes (read-only)
router.get('/:city', alertController.getAllAlerts);

//Protected routes
router.use(authController.protect);
router.post('/', alertController.createAlert);
router.put('/:id', alertController.updateAlert);
router.delete('/:id', alertController.deleteAlert);

module.exports = router;