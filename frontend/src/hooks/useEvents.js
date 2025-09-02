import { useState, useEffect } from 'react';
import { useCity } from '../contexts/CityContext';
import api from '../services/api';

const useEvents = () => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedCity } = useCity();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/events/${selectedCity}`);
        setEvents(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        // Mock data for demo purposes
        setEvents([
          { 
            name: "Agadir Summer Festival", 
            date: "Aug 20",
            type: "festival",
            icon: "N"
          },
          { 
            name: "Surf Competition", 
            date: "Aug 25",
            type: "sports",
            icon: "∅"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCity]);

  return { events, loading, error };
};

export default useEvents;