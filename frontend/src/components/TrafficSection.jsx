import React from 'react';
import useTraffic from '../hooks/useTraffic';

const TrafficSection = () => {
  const { traffic, loading, error } = useTraffic();

  if (loading) return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-traffic-cone"></i>TRAFFIC ALERTS
      </h2>
      <div className="text-center py-4">
        <div className="loading-spinner mx-auto"></div>
        <p className="mt-2" style={{color: 'var(--text-secondary)'}}>Loading traffic data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-traffic-cone"></i>TRAFFIC ALERTS
      </h2>
      <div className="error-message">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Error loading traffic data
      </div>
    </div>
  );

  if (!Array.isArray(traffic) || traffic.length === 0) {
    return (
      <div className="card-custom">
        <h2 className="card-title">
          <i className="bi bi-traffic-cone"></i>TRAFFIC ALERTS
        </h2>
        <div className="text-center py-4" style={{color: 'var(--text-secondary)'}}>
          <i className="bi bi-check-circle-fill me-2"></i>
          No traffic alerts
        </div>
      </div>
    );
  }

  return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-traffic-cone"></i>TRAFFIC ALERTS
      </h2>
      <div className="space-y-3">
        {traffic.map((alert, index) => (
          <div key={index} className="traffic-item">
            <div className="d-flex align-items-start">
              <div className="alert-indicator"></div>
              <div>
                <p className="fw-medium mb-1" style={{color: 'var(--text-primary)'}}>{alert.location}</p>
                <p className="small mb-0" style={{color: 'var(--text-secondary)'}}>
                  {alert.message || alert.description}
                </p>
                {alert.congestionLevel && (
                  <span className={`badge ${
                    alert.congestionLevel === 'heavy' ? 'bg-warning' :
                    alert.congestionLevel === 'severe' ? 'bg-danger' : 'bg-info'
                  } mt-1`}>
                    {alert.congestionLevel}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSection;