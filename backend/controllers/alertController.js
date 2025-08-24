const Alert = require('../models/Alert');

exports.getAllAlerts = async (req, res) => {
  try {
    const { city } = req.params;
    const { type, active } = req.query;
    
    const query = { city };
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