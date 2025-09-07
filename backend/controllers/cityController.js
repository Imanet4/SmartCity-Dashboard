const City = require('../models/City');
const Weather = require('../models/Weather');
const Traffic = require('../models/Traffic');
const Alert = require('../models/Alert');
const Event = require('../models/Event');

// Helper function to get data by city name
const getDataByCityName = async (Model, cityName) => {
  // First find the city by name to get its ID
  const city = await City.findOne({ name: cityName });
  if (!city) return null;
  
  // Then find data that references this city ID
  return await Model.find({ city: city._id });
};

// Get weather for a specific city
const getCityWeather = async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const weatherData = await getDataByCityName(Weather, cityName);
    
    if (!weatherData || weatherData.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Weather data not found for this city' 
      });
    }
    
    res.json({
      success: true,
      data: weatherData[0] // Return the first (should be only one) weather entry
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
    const trafficData = await getDataByCityName(Traffic, cityName);
    
    if (!trafficData || trafficData.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Traffic data not found for this city' 
      });
    }
    
    res.json({
      success: true,
      data: trafficData
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
    const alertsData = await getDataByCityName(Alert, cityName);
    
    if (!alertsData || alertsData.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Alerts data not found for this city' 
      });
    }
    
    res.json({
      success: true,
      data: alertsData
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
    const eventsData = await getDataByCityName(Event, cityName);
    
    if (!eventsData || eventsData.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Events data not found for this city' 
      });
    }
    
    res.json({
      success: true,
      data: eventsData
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
    
    res.json({
      success: true,
      data: {
        name: city.name,
        coordinates: city.coordinates,
        zoomLevel: city.zoomLevel
      }
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