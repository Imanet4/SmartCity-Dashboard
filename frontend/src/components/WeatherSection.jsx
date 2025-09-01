import React from 'react';
import useWeather from '../hooks/useWeather';

const WeatherSection = () => {
  const { weather, loading, error } = useWeather();

  if (loading) return <div className="card">Loading weather...</div>;
  if (error) return <div className="card">Error loading weather data</div>;

  return (
    <div className="card">
      <h2 className="card-title">WEATHER</h2>
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600">{weather.temperature}°C</div>
        <div className="text-gray-600 mt-2">Air: {weather.airQuality}</div>
      </div>
    </div>
  );
};

export default WeatherSection;