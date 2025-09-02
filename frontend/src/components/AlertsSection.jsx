import React from 'react';
import useAlerts from '../hooks/useAlerts';

const AlertsSection = () => {
  const { alerts, loading, error } = useAlerts();

  if (loading) return <div className="card">Loading safety alerts...</div>;
  if (error) return <div className="card">Error loading safety alerts</div>;

  return (
    <div className="card">
      <h2 className="card-title">SAFETY ALERTS</h2>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className="flex items-start">
            <div className="alert-indicator"></div>
            <div>
              <p className="font-medium">{alert.message}</p>
              {alert.severity && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  alert.severity === 'high' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.severity.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsSection;