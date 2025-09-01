import { useState, useEffect } from 'react';
import { useCity } from '../contexts/CityContext';
import api from '../services/api';

const useAlerts = () => {
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedCity } = useCity();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/alerts/${selectedCity}`);
        setAlerts(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        // Mock data for demo purposes
        setAlerts({
          active: true,
          type: 'Weather Advisory',
          severity: 'Moderate',
          message: 'Heavy rain expected in the afternoon',
          issuedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
          affectedAreas: ['Downtown', 'East District']
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [selectedCity]);

  return { alerts, loading, error };
};

export default useAlerts;