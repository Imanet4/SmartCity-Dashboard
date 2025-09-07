const City = require('../models/City');
const Weather = require('../models/Weather');
const Traffic = require('../models/Traffic');
const Alert = require('../models/Alert');
const Event = require('../models/Event');

// Get weather for a specific city
const getCityWeather = async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const city = await City.findOne({ name: cityName }).populate('weatherData');
    
    if (!city || !city.weatherData) {
      return res.status(404).json({ 
        success: false, 
        message: 'Weather data not found for this city' 
      });
    }
    
    res.json({
      success: true,
      data: city.weatherData
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get traffic for a specific city
const getCityTraffic = async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const city = await City.findOne({ name: cityName }).populate('trafficData');
    
    if (!city || !city.trafficData) {
      return res.status(404).json({ 
        success: false, 
        message: 'Traffic data not found for this city' 
      });
    }
    
    res.json({
      success: true,
      data: city.trafficData
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get alerts for a specific city
const getCityAlerts = async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const city = await City.findOne({ name: cityName }).populate('alertsData');
    
    if (!city || !city.alertsData) {
      return res.status(404).json({ 
        success: false, 
        message: 'Alerts data not found for this city' 
      });
    }
    
    res.json({
      success: true,
      data: city.alertsData
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get events for a specific city
const getCityEvents = async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const city = await City.findOne({ name: cityName }).populate('eventsData');
    
    if (!city || !city.eventsData) {
      return res.status(404).json({ 
        success: false, 
        message: 'Events data not found for this city' 
      });
    }
    
    res.json({
      success: true,
      data: city.eventsData
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get city details (coordinates, zoom level)
const getCityDetails = async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const city = await City.findOne({ name: cityName });
    
    if (!city) {
      return res.status(404).json({ 
        success: false, 
        message: 'City not found' 
      });
    }
    
    // Return only city details, not the populated data
    const cityDetails = {
      name: city.name,
      coordinates: city.coordinates,
      zoomLevel: city.zoomLevel
    };
    
    res.json({
      success: true,
      data: cityDetails
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = {
  getCityWeather,
  getCityTraffic,
  getCityAlerts,
  getCityEvents,
  getCityDetails
};