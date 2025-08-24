const axios = require('axios');
require('dotenv').config();

const getWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    
    return {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      conditions: response.data.weather[0].main
    };
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    throw error;
  }
};

const getAirQuality = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
    );
    return response.data.list[0].main.aqi;
  } catch (error) {
    console.error('Error fetching air quality data:', error.message);
    throw error;
  }
};

module.exports = { getWeatherData, getAirQuality };