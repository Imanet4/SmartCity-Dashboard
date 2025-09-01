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
            id: 1,
            title: 'City Marathon',
            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Central Park',
            type: 'Sports',
            impact: 'Road closures expected'
          },
          {
            id: 2,
            title: 'Music Festival',
            date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Downtown Square',
            type: 'Entertainment',
            impact: 'Increased traffic and parking restrictions'
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