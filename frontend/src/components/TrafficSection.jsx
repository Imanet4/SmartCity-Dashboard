import React from 'react';
import useTraffic from '../hooks/useTraffic';

const TrafficSection = () => {
  const { traffic, loading, error } = useTraffic();

  if (loading) return <div className="card">Loading traffic data...</div>;
  if (error) return <div className="card">Error loading traffic data</div>;

  return (
    <div className="card-custom">
      <h2 className="card-title">TRAFFIC ALERTS</h2>
      <div className="traffic-alerts">
        {traffic.map((alert, index) => (
          <div key={index} className="d-flex align-items-start mb-3">
            <div className="alert-indicator"></div>
            <div>
              <p className="fw-medium mb-1">{alert.location}</p>
              <p className="text-muted small mb-0">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSection;