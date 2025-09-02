import React from 'react';
import useEvents from '../hooks/useEvents';

const EventsSection = () => {
  const { events, loading, error } = useEvents();

  if (loading) return <div className="card">Loading events...</div>;
  if (error) return <div className="card">Error loading events</div>;

  return (
    <div className="card">
      <h2 className="card-title">LOCAL EVENTS</h2>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-start">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full mr-3 flex-shrink-0">
              <span className="text-blue-700 font-semibold">{event.icon}</span>
            </div>
            <div>
              <p className="font-medium">{event.name}</p>
              <p className="text-sm text-gray-600">({event.date})</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;