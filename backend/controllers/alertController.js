const Alert = require('../models/Alert');
const City = require('../models/City');


exports.getAllAlerts = async (req, res) => {
  try {
    const { city } = req.params;
    
    // First find the city by name to get its ID
    const cityDoc = await City.findOne({ name: city });
    if (!cityDoc) {
      return res.status(404).json({
        status: 'fail',
        message: 'City not found'
      });
    }
    
    const { type, active } = req.query;
    
    const query = { city: cityDoc._id }; // Use city ID instead of name
    if (type) query.type = type;
    if (active) query.isActive = active === 'true';
    
    const alerts = await Alert.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: alerts.length,
      data: {
        alerts
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

//Creating a new alert (admin only)
exports.createAlert = async (req, res) => {
  try {
    const alert = await Alert.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        alert
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};


//Updating the alert (admin only)
exports.updateAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        alert
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

//Deleting an alert (admin only)

exports.deleteAlert = async (req, res) => {
  try{
    const alert = await Alert.findByIdAndDelete(req.params.id);

    if(!alert) {
      return res.status(404).json({
        status: 'fail',
        message: 'No alert found with that ID'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch(err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
}