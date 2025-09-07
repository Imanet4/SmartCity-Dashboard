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
        setTraffic(response.data.data || [] );
        setError(null);
      } catch (err) {
        setError(err.message);
        // Mock data for demo purposes
        setTraffic([
          { 
            location: "Souk El Had road", 
            message: "heavy traffic",
            type: "traffic"
          },
          { 
            location: "Marina roundabout", 
            message: "accident",
            type: "accident"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTraffic();
  }, [selectedCity]);

  return { traffic, loading, error };
};

export default useTraffic;