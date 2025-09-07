import React from 'react';
import useWeather from '../hooks/useWeather';

const WeatherSection = () => {
  const { weather, loading, error } = useWeather();

  if (loading) return <div className="card">Loading weather...</div>;
  if (error) return <div className="card">Error loading weather data</div>;

  return (
    <div className="card-custom">
      <h2 className="card-title">WEATHER</h2>
      <div className="text-center">
        <div className="display-4 fw-bold text-primary-custom">{weather.temperature}°C</div>
        <div className="text-muted mt-2">Air: {weather.airQuality}</div>
      </div>
    </div>
  );
};

export default WeatherSection;