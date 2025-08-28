const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { promisify } = require('util');

const protect = async (req, res, next) => {
  try {
    //1: Getting token and checking if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new Error('You are not logged in! Please log in to get access.');
    }

    //2: Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3: Checking if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error('The user belonging to this token does no longer exist.');
    }

    //GRANTING ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: err.message
    });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

module.exports = {protect, restrictTo};