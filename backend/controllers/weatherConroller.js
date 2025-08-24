const Weather = require('../models/Weather');
const { getWeatherData, getAirQuality } = require('../services/api/openWeatherService');

exports.getCurrentWeather = async (req, res) => {
  try {
    const { city } = req.params;
    
    // Get weather from OpenWeather API
    const weatherData = await getWeatherData(city);
    
    // Get air quality (using fixed coordinates for Agadir as example)
    const aqi = await getAirQuality(30.427755, -9.598107);
    
    // Save to database
    const weather = await Weather.create({
      city,
      temperature: weatherData.temperature,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
      conditions: weatherData.conditions,
      airQuality: aqi
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        weather
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getWeatherHistory = async (req, res) => {
  try {
    const { city } = req.params;
    const { days = 7 } = req.query;
    
    const date = new Date();
    date.setDate(date.getDate() - days);
    
    const weatherHistory = await Weather.find({
      city,
      timestamp: { $gte: date }
    }).sort({ timestamp: -1 });
    
    res.status(200).json({
      status: 'success',
      results: weatherHistory.length,
      data: {
        weatherHistory
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};