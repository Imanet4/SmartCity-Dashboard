import react, { useEffect, useState } from 'react';
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Admin Toggle Button (only visible to admins) */}
      {isAdmin && (
        <div className="bg-blue-50 border-b border-blue-200 p-2">
          <div className="container mx-auto flex justify-between items-center">
            <span className="text-blue-800 text-sm">Admin Mode</span>
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded"
            >
              {showAdminPanel ? 'Hide Admin Panel' : 'Show Admin Panel'}
            </button>
          </div>
        </div>
      )}
      
      <main className="container mx-auto p-4">
        {/* Admin Panel (shown when toggled) */}
        {isAdmin && showAdminPanel && (
          <div className="mb-6">
            <AdminPanel />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weather Card */}
          <div className="lg:col-span-1">
            <WeatherSection />
          </div>
          
          {/* Analytics */}
          <div className="lg:col-span-2">
            <AnalyticsCharts />
          </div>
          
          {/* Traffic Alerts */}
          <div className="lg:col-span-1">
            <TrafficSection />
          </div>
          
          {/* Safety Alerts */}
          <div className="lg:col-span-1">
            <AlertsSection />
          </div>
          
          {/* Local Events */}
          <div className="lg:col-span-1">
            <EventsSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;