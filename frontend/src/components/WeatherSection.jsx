import React from 'react';
import useWeather from '../hooks/useWeather';

const WeatherSection = () => {
  const { weather, loading, error } = useWeather();

  const getWeatherIcon = (conditions) => {
    const iconMap = {
      sunny: 'bi-sun',
      clear: 'bi-sun',
      cloudy: 'bi-cloud',
      rainy: 'bi-cloud-rain',
      snowy: 'bi-snow',
      stormy: 'bi-lightning',
      windy: 'bi-wind',
      foggy: 'bi-cloud-fog'
    };
    
    const condition = conditions?.toLowerCase() || 'clear';
    return iconMap[condition] || 'bi-sun';
  };

  if (loading) return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-cloud-sun"></i>WEATHER
      </h2>
      <div className="text-center py-5">
        <div className="loading-spinner mx-auto" style={{width: '40px', height: '40px'}}></div>
        <p className="mt-3" style={{color: 'var(--text-secondary)', fontWeight: '500'}}>
          Loading weather data...
        </p>
      </div>
    </div>
  );

  if (error) return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-cloud-sun"></i>WEATHER
      </h2>
      <div className="error-message">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Error loading weather data
      </div>
    </div>
  );

  return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-cloud-sun"></i>WEATHER
      </h2>
      <div className="weather-display">
        <div className="weather-icon">
          <i className={`bi ${getWeatherIcon(weather.conditions)}`} style={{fontSize: '4rem'}}></i>
        </div>
        <div className="temperature">{weather.temperature}°C</div>
        <div className="weather-condition" style={{
          color: 'var(--text-secondary)', 
          fontSize: '1.3rem',
          fontWeight: '600',
          marginBottom: '2rem'
        }}>
          {weather.conditions || 'Clear'}
        </div>
        <div className="weather-details">
          <div className="weather-detail">
            <div className="detail-value" style={{color: 'var(--primary)', fontSize: '1.3rem'}}>
              {weather.humidity}%
            </div>
            <div className="detail-label" style={{color: 'var(--text-secondary)'}}>Humidity</div>
          </div>
          <div className="weather-detail">
            <div className="detail-value" style={{color: 'var(--primary)', fontSize: '1.3rem'}}>
              {weather.windSpeed} km/h
            </div>
            <div className="detail-label" style={{color: 'var(--text-secondary)'}}>Wind</div>
          </div>
          <div className="weather-detail">
            <div className="detail-value" style={{color: 'var(--primary)', fontSize: '1.3rem'}}>
              {weather.airQuality}
            </div>
            <div className="detail-label" style={{color: 'var(--text-secondary)'}}>Air Quality</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherSection;