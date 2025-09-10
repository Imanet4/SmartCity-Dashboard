import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import WeatherSection from '../components/WeatherSection';
import TrafficSection from '../components/TrafficSection';
import AlertsSection from '../components/AlertsSection';
import EventsSection from '../components/EventsSection';
import AnalyticsCharts from '../components/AnalyticsCharts';
import AdminPanel from '../components/AdminPanel';
import { checkAuth } from '../services/auth';

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  // Set current date on component mount
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };
    
    updateDate();
    // Update date at midnight
    const now = new Date();
    const timeUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
    const timeoutId = setTimeout(() => {
      updateDate();
      // Set interval to update every day after
      setInterval(updateDate, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Check if user is admin on component mount
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const authStatus = await checkAuth();
        setIsAdmin(authStatus.isAuthenticated && authStatus.isAdmin);
      } catch (error) {
        console.log('User is not authenticated as admin');
        setIsAdmin(false);
      }
    };
    
    verifyAdmin();
  }, []);

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Header />
      
      {/* Enhanced Date Display */}
      <div className="date-display-container">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i className="bi bi-calendar-check me-2"></i>
              <span className="fw-medium">{currentDate}</span>
            </div>
            <span className="badge real-time-badge">
              <i className="bi bi-clock me-1"></i>
              Real-time Data
            </span>
          </div>
        </div>
      </div>
      
      {/* Admin Toggle Button */}
      {isAdmin && (
        <div className="bg-primary-custom text-white py-2">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <span>Admin Mode</span>
              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="btn btn-sm btn-light"
              >
                {showAdminPanel ? 'Hide Admin Panel' : 'Show Admin Panel'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <main className="container py-4">
        {/* Admin Panel */}
        {isAdmin && showAdminPanel && (
          <div className="mb-4">
            <AdminPanel />
          </div>
        )}
        
        {/* Top Row: Weather, Alerts, and Traffic in one line */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-4">
            <WeatherSection />
          </div>
          
          <div className="col-12 col-lg-4">
            <AlertsSection />
          </div>
          
          <div className="col-12 col-lg-4">
            <TrafficSection />
          </div>
        </div>
        
        {/* Middle Row: Events and Analytics */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-6">
            <EventsSection />
          </div>
          
          <div className="col-12 col-lg-6">
            <AnalyticsCharts />
          </div>
        </div>
        
        {/* Hospital Map Placeholder */}
        <div className="row g-4">
          <div className="col-12">
            <div className="card-custom text-center">
              <h2 className="card-title">
                <i className="bi bi-hospital"></i>NEARBY HOSPITALS & HEALTHCARE
              </h2>
              <div className="py-5">
                <div className="mb-3">
                  <i className="bi bi-map display-1 text-primary"></i>
                </div>
                <h4 className="mb-3">Interactive Map Coming Soon</h4>
                <p className="text-muted mb-4">
                  We're working on an interactive map to show hospitals, clinics, 
                  and healthcare facilities near your current location.
                </p>
                <button className="btn btn-primary" disabled>
                  <i className="bi bi-geo-alt me-2"></i>
                  Enable Location Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;