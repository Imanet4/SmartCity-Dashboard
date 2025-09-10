import React from 'react';
import useEvents from '../hooks/useEvents';

const EventsSection = () => {
  const { events, loading, error } = useEvents();

  if (loading) return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-calendar-event"></i>LOCAL EVENTS
      </h2>
      <div className="text-center py-4">
        <div className="loading-spinner mx-auto"></div>
        <p className="mt-2" style={{color: 'var(--text-secondary)'}}>Loading events...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-calendar-event"></i>LOCAL EVENTS
      </h2>
      <div className="error-message">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Error loading events
      </div>
    </div>
  );

  if (!Array.isArray(events) || events.length === 0) {
    return (
      <div className="card-custom">
        <h2 className="card-title">
          <i className="bi bi-calendar-event"></i>LOCAL EVENTS
        </h2>
        <div className="text-center py-4" style={{color: 'var(--text-secondary)'}}>
          <i className="bi bi-calendar-x me-2"></i>
          No upcoming events
        </div>
      </div>
    );
  }

  const getEventIcon = (type) => {
    const iconMap = {
      festival: 'bi-music-note-beamed',
      sports: 'bi-trophy',
      cultural: 'bi-building',
      music: 'bi-music-note',
      other: 'bi-star'
    };
    
    return iconMap[type] || 'bi-calendar-event';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-calendar-event"></i>LOCAL EVENTS
      </h2>
      <div className="space-y-3">
        {events.map((event, index) => (
          <div key={index} className="event-item">
            <div className="d-flex align-items-start">
              <div className="event-icon">
                <i className={`bi ${getEventIcon(event.type)}`}></i>
              </div>
              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1" style={{color: 'var(--primary)'}}>
                  {event.name || event.title}
                </h6>
                <p className="small mb-2" style={{color: 'var(--text-secondary)'}}>
                  {event.description}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-secondary">
                    <i className="bi bi-tag me-1"></i>
                    {event.type}
                  </span>
                  <span className="small" style={{color: 'var(--text-secondary)'}}>
                    <i className="bi bi-calendar me-1"></i>
                    {formatDate(event.date || event.startDate)}
                  </span>
                </div>
                {event.location && (
                  <div className="small mt-2" style={{color: 'var(--text-secondary)'}}>
                    <i className="bi bi-geo-alt me-1"></i>
                    {event.location}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;