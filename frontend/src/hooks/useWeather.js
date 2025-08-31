import { useState, useEffect } from 'react';
import { useCity } from '../contexts/CityContext';
import api from '../services/api';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedCity } = useCity();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Simulate API call
        const response = await api.get(`/weather/${selectedCity}`);
        setWeather(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        // For demo purposes, set mock data
        setWeather({
          temperature: 28,
          airQuality: 'Good',
          humidity: 65,
          windSpeed: 12
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  return { weather, loading, error };
};

export default useWeather;