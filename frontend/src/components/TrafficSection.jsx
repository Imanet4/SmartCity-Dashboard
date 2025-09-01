import React from 'react';
import useTraffic from '../hooks/useTraffic';

const TrafficSection = () => {
  const { traffic, loading, error } = useTraffic();

  if (loading) return <div className="card">Loading traffic data...</div>;
  if (error) return <div className="card">Error loading traffic data</div>;

  return (
    <div className="card">
      <h2 className="card-title">TRAFFIC ALERTS</h2>
      <div className="space-y-3">
        {traffic.map((alert, index) => (
          <div key={index} className="flex items-start">
            <div className="alert-indicator"></div>
            <div>
              <p className="font-medium">{alert.location}</p>
              <p className="text-sm text-gray-600">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficSection;