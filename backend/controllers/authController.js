const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AppError } = require('../utils/errorHandler');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d'
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 90) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res.cookie('jwt', token, cookieOptions);

  // Removing password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};


exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'user',
      cityPreferences: req.body.cityPreferences || []
    });

        createSendToken(newUser, 201, res);
  } catch (err) {
    next(err);
  }
};


exports.checkAuth = async (req, res) => {
  try {
    // For now, return false for both - you'll implement proper auth later
    res.json({
      isAuthenticated: false,
      isAdmin: false
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};



exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Checking if email and password exist
    if (!email || !password) {
      return next (new AppError('Please provide email and password!', 400));
    }

    //Checking if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    //If everything is okay, sending token to client
    createSendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

