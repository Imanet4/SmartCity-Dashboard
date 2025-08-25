const Event = require('../models/Event');
const { AppError } = require('../utils/errorHandler');

//Get all events for a city
exports.getEvents = async (req, res, next) => {
  try {
    const { city } = req.params;
    const { page = 1, limit = 10, category, featured } = req.query;
    
    const query = { city };
    if (category) query.category = category;
    if (featured) query.isFeatured = featured === 'true';
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { startDate: 1 }
    };
    
    //Using pagination
    const events = await Event.find(query)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit);
    
    const total = await Event.countDocuments(query);
    
    res.status(200).json({
      status: 'success',
      results: events.length,
      data: {
        events,
        totalPages: Math.ceil(total / options.limit),
        currentPage: options.page
      }
    });
  } catch (err) {
    next(err);
  }
};

//Get a single event
exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return next(new AppError('No event found with that ID', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (err) {
    next(err);
  }
};

//Create a new event (admin only)
exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (err) {
    next(err);
  }
};

//Update an event (admin only)
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!event) {
      return next(new AppError('No event found with that ID', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (err) {
    next(err);
  }
};

//Delete an event (admin only)
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return next(new AppError('No event found with that ID', 404));
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};