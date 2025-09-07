const express = require('express');
const authController = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../utils/validation');
const router = express.Router();

// Authentication routes
router.post('/signup', signupValidation, authController.signup);
router.post('/login', loginValidation, authController.login);
router.get('/check', authController.checkAuth);

module.exports = router;