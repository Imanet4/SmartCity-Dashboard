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
        setAlerts([
          { 
            type: "heatwave", 
            message: "Heatwave Warning until 6PM",
            severity: "high"
          },
          { 
            type: "waves", 
            message: "Strong Waves at Taghazout",
            severity: "medium"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [selectedCity]);

  return { alerts, loading, error };
};

export default useAlerts;