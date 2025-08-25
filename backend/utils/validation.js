const { body, param, query, validationResult } = require('express-validator');
const { AppError } = require('./errorHandler');

// Validation middleware
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorMessages = errors.array().map(error => ({
      field: error.param,
      message: error.msg,
      value: error.value
    }));

    next(new AppError(`Validation failed: ${JSON.stringify(errorMessages)}`, 400));
  };
};

// Common validation rules
const cityValidation = param('city')
  .isString()
  .isLength({ min: 2, max: 50 })
  .withMessage('City name must be between 2 and 50 characters')
  .matches(/^[a-zA-Z\s\-']+$/)
  .withMessage('City name can only contain letters, spaces, hyphens, and apostrophes');

const emailValidation = body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Please provide a valid email address');

const passwordValidation = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters long')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number');

const usernameValidation = body('username')
  .isLength({ min: 3, max: 20 })
  .withMessage('Username must be between 3 and 20 characters')
  .matches(/^[a-zA-Z0-9_]+$/)
  .withMessage('Username can only contain letters, numbers, and underscores');

// Specific validation chains
const signupValidation = validate([
  usernameValidation,
  emailValidation,
  passwordValidation,
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role must be either user or admin')
]);

const loginValidation = validate([
  emailValidation,
  body('password').notEmpty().withMessage('Password is required')
]);

const weatherValidation = validate([
  cityValidation
]);

const alertValidation = validate([
  body('city')
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('City name must be between 2 and 50 characters'),
  body('type')
    .isIn(['traffic', 'safety', 'weather'])
    .withMessage('Alert type must be traffic, safety, or weather'),
  body('severity')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Severity must be low, medium, or high'),
  body('title')
    .isString()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .isString()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('location')
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage('Location must be less than 200 characters'),
  body('coordinates.lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  body('coordinates.lng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180')
]);

const eventValidation = validate([
  body('city')
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('City name must be between 2 and 50 characters'),
  body('title')
    .isString()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('category')
    .isIn(['festival', 'sports', 'culture', 'music', 'other'])
    .withMessage('Category must be festival, sports, culture, music, or other'),
  body('location')
    .isString()
    .isLength({ max: 200 })
    .withMessage('Location must be less than 200 characters'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date')
]);

module.exports = {
  validate,
  signupValidation,
  loginValidation,
  weatherValidation,
  alertValidation,
  eventValidation,
  cityValidation
};