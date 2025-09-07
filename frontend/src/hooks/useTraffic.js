import { useState, useEffect } from 'react';
import { useCity } from '../contexts/CityContext';
import api from '../services/api';

const useTraffic = () => {
  const [traffic, setTraffic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedCity } = useCity();

  useEffect(() => {
    const fetchTraffic = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/cities/${selectedCity}/traffic`);
        setTraffic(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        // Mock data for demo purposes
        setTraffic({
          congestionLevel: 'Moderate',
          averageSpeed: 45,
          incidents: 2,
          majorRoutes: [
            { name: 'Main Highway', status: 'Slow', delay: '15 min' },
            { name: 'Downtown Expressway', status: 'Clear', delay: '0 min' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTraffic();
  }, [selectedCity]);

  return { traffic, loading, error };
};

export default useTraffic;