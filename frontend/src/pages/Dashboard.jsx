import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import WeatherSection from '../components/WeatherSection';
import TrafficSection from '../components/TrafficSection';
import AlertsSection from '../components/AlertsSection';
import EventsSection from '../components/EventsSection';
import AnalyticsCharts from '../components/AnalyticsCharts';
import AdminPanel from '../components/AdminPanel';
import { checkAuth } from '../services/auth'


const Dashboard = () => {
      const [isAdmin, setIsAdmin] = useState(false);
      const [showAdminPanel, setShowAdminPanel] = useState(false);
     
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
    <div className="min-vh-100">
      <Header />
      
      {/* Admin Toggle Button (only visible to admins) */}
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
        {/* Admin Panel (shown when toggled) */}
        {isAdmin && showAdminPanel && (
          <div className="mb-4">
            <AdminPanel />
          </div>
        )}
        
        <div className="row">
          {/* Weather Card */}
          <div className="col-lg-4 col-md-6 mb-4">
            <WeatherSection />
          </div>
          
          {/* Analytics */}
          <div className="col-lg-8 col-md-6 mb-4">
            <AnalyticsCharts />
          </div>
          
          {/* Traffic Alerts */}
          <div className="col-lg-4 col-md-6 mb-4">
            <TrafficSection />
          </div>
          
          {/* Safety Alerts */}
          <div className="col-lg-4 col-md-6 mb-4">
            <AlertsSection />
          </div>
          
          {/* Local Events */}
          <div className="col-lg-4 col-md-6 mb-4">
            <EventsSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;