const Traffic = require('../models/Traffic');
const { AppError } = require('../utils/errorHandler');

// Get all traffic incidents for a city
exports.getTrafficIncidents = async (req, res, next) => {
  try {
    const { city } = req.params;
    const { active } = req.query;
    
    const query = { city };
    if (active !== undefined) query.isActive = active === 'true';
    
    const trafficIncidents = await Traffic.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: trafficIncidents.length,
      data: {
        trafficIncidents
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get traffic incidents near a location
exports.getTrafficNearLocation = async (req, res, next) => {
  try {
    console.log('Query parameters received:', req.query);

    const { lat, lon, maxDistance = 5000 } = req.query; // maxDistance in meters
    
    if (!lat || !lon) {
      return next(new AppError('Please provide latitude and longitude', 400));
    }

     const coordinates = [parseFloat(lon), parseFloat(lat)];
    console.log('Searching near coordinates:', coordinates);
    
    const query = {
      isActive: true,
      'coordinates.coordinates': {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: coordinates
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    };
    console.log('MongoDB query:', JSON.stringify(query, null, 2));
    

    const trafficIncidents = await Traffic.find(query);
    console.log('Found', trafficIncidents.length, 'results');
    
    res.status(200).json({
      status: 'success',
      results: trafficIncidents.length,
      data: {
        trafficIncidents
      }
    });
  } catch (err) {
    console.error('Error in getTrafficNearLocation:', err);
    next(err);
  }
};

// Create a traffic incident (admin only)
exports.createTrafficIncident = async (req, res, next) => {
  try {
    const trafficIncident = await Traffic.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        trafficIncident
      }
    });
  } catch (err) {
    next(err);
  }
};

// Update a traffic incident (admin only)
exports.updateTrafficIncident = async (req, res, next) => {
  try {
    const trafficIncident = await Traffic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!trafficIncident) {
      return next(new AppError('No traffic incident found with that ID', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        trafficIncident
      }
    });
  } catch (err) {
    next(err);
  }
};