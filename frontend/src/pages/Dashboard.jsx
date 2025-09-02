import React from 'react';
import Header from '../components/common/Header';
import WeatherSection from '../components/weather/WeatherSection';
import TrafficSection from '../components/traffic/TrafficSection';
import AlertsSection from '../components/alerts/AlertsSection';
import EventsSection from '../components/events/EventsSection';
import AnalyticsCharts from '../components/analytics/AnalyticsCharts';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-4">
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