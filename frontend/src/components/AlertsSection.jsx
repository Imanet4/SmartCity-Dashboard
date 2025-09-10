import React from 'react';
import useAlerts from '../hooks/useAlerts';

const AlertsSection = () => {
  const { alerts, loading, error } = useAlerts();

  if (loading) return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-exclamation-triangle"></i>SAFETY ALERTS
      </h2>
      <div className="text-center py-4">
        <div className="loading-spinner mx-auto"></div>
        <p className="mt-2" style={{color: 'var(--text-secondary)'}}>Loading safety alerts...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-exclamation-triangle"></i>SAFETY ALERTS
      </h2>
      <div className="error-message">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Error loading safety alerts
      </div>
    </div>
  );

  if (!Array.isArray(alerts) || alerts.length === 0) {
    return (
      <div className="card-custom">
        <h2 className="card-title">
          <i className="bi bi-exclamation-triangle"></i>SAFETY ALERTS
        </h2>
        <div className="text-center py-4" style={{color: 'var(--text-secondary)'}}>
          <i className="bi bi-check-circle-fill me-2"></i>
          No safety alerts at this time
        </div>
      </div>
    );
  }

  const getSeverityBadge = (severity) => {
    const severityConfig = {
      high: { class: 'bg-danger', icon: 'bi-exclamation-triangle-fill' },
      medium: { class: 'bg-warning', icon: 'bi-exclamation-triangle' },
      low: { class: 'bg-info', icon: 'bi-info-circle' },
      critical: { class: 'bg-danger', icon: 'bi-exclamation-octagon-fill' }
    };
    
    const config = severityConfig[severity?.toLowerCase()] || severityConfig.medium;
    
    return (
      <span className={`badge ${config.class} ms-2`}>
        <i className={`${config.icon} me-1`}></i>
        {severity}
      </span>
    );
  };

  const getAlertIcon = (type) => {
    const iconMap = {
      weather: 'bi-cloud-lightning',
      safety: 'bi-shield-exclamation',
      traffic: 'bi-traffic-cone',
      emergency: 'bi-ambulance',
      heatwave: 'bi-thermometer-high',
      waves: 'bi-water'
    };
    
    return iconMap[type] || 'bi-exclamation-circle';
  };

  return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-exclamation-triangle"></i>SAFETY ALERTS
      </h2>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className="alert-item">
            <div className="d-flex align-items-start">
              <div className="alert-indicator"></div>
              <div className="flex-grow-1">
                <div className="d-flex align-items-center mb-1">
                  <i className={`bi ${getAlertIcon(alert.type)} me-2`} style={{color: 'var(--danger)'}}></i>
                  <span className="fw-medium" style={{color: 'var(--text-primary)'}}>
                    {alert.title || alert.type}
                  </span>
                  {alert.severity && getSeverityBadge(alert.severity)}
                </div>
                <p className="small mb-1" style={{color: 'var(--text-secondary)'}}>
                  {alert.message || alert.description}
                </p>
                {alert.location && (
                  <div className="small" style={{color: 'var(--text-secondary)'}}>
                    <i className="bi bi-geo-alt me-1"></i>
                    {alert.location}
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

export default AlertsSection;