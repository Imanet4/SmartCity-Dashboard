import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTheme } from '../contexts/ThemeContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsCharts = () => {
  const { isDark } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Chart data with dark mode support
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Traffic Incidents',
        data: [3, 5, 2, 6, 4, 8, 7],
        backgroundColor: isDark ? 'rgba(231, 126, 34, 0.8)' : 'rgba(211, 84, 0, 0.8)',
        borderColor: isDark ? 'rgb(231, 126, 34)' : 'rgb(211, 84, 0)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Safety Alerts',
        data: [1, 2, 1, 3, 2, 4, 3],
        backgroundColor: isDark ? 'rgba(155, 89, 182, 0.8)' : 'rgba(142, 68, 173, 0.8)',
        borderColor: isDark ? 'rgb(155, 89, 182)' : 'rgb(142, 68, 173)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#ecf0f1' : '#2c3e50',
          font: {
            size: 13,
            weight: '600'
          }
        }
      },
      title: {
        display: true,
        text: 'Weekly Activity Overview',
        color: isDark ? '#ecf0f1' : '#2c3e50',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDark ? '#bdc3c7' : '#7f8c8d',
          font: {
            weight: '500'
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDark ? '#bdc3c7' : '#7f8c8d',
          stepSize: 2,
          font: {
            weight: '500'
          }
        },
      },
    },
  };

  if (loading) return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-bar-chart"></i>ANALYTICS
      </h2>
      <div className="text-center py-4">
        <div className="loading-spinner mx-auto"></div>
        <p className="mt-2 text-muted">Loading analytics...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-bar-chart"></i>ANALYTICS
      </h2>
      <div className="error-message">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Error loading analytics data
      </div>
    </div>
  );

  return (
    <div className="card-custom">
      <h2 className="card-title">
        <i className="bi bi-bar-chart"></i>ANALYTICS
      </h2>
      
      <div className="chart-container mb-4" style={{ height: '300px' }}>
        <Bar data={data} options={options} />
      </div>
      
      <div className="row g-3">
        <div className="col-6 col-md-3">
          <div className="text-center p-3 rounded" style={{ 
            background: isDark ? 'rgba(231, 126, 34, 0.15)' : 'rgba(211, 84, 0, 0.1)',
            border: `1px solid ${isDark ? 'rgba(231, 126, 34, 0.3)' : 'rgba(211, 84, 0, 0.2)'}`
          }}>
            <div className="h4 mb-1" style={{ color: 'var(--primary)' }}>35</div>
            <div className="small" style={{ color: 'var(--text-secondary)' }}>Total Incidents</div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="text-center p-3 rounded" style={{ 
            background: isDark ? 'rgba(155, 89, 182, 0.15)' : 'rgba(142, 68, 173, 0.1)',
            border: `1px solid ${isDark ? 'rgba(155, 89, 182, 0.3)' : 'rgba(142, 68, 173, 0.2)'}`
          }}>
            <div className="h4 mb-1" style={{ color: 'var(--secondary)' }}>28</div>
            <div className="small" style={{ color: 'var(--text-secondary)' }}>Resolved</div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="text-center p-3 rounded" style={{ 
            background: isDark ? 'rgba(52, 152, 219, 0.15)' : 'rgba(52, 152, 219, 0.1)',
            border: `1px solid ${isDark ? 'rgba(52, 152, 219, 0.3)' : 'rgba(52, 152, 219, 0.2)'}`
          }}>
            <div className="h4 mb-1" style={{ color: 'var(--info)' }}>12</div>
            <div className="small" style={{ color: 'var(--text-secondary)' }}>Active Alerts</div>
          </div>
        </div>
        
        <div className="col-6 col-md-3">
          <div className="text-center p-3 rounded" style={{ 
            background: isDark ? 'rgba(39, 174, 96, 0.15)' : 'rgba(39, 174, 96, 0.1)',
            border: `1px solid ${isDark ? 'rgba(39, 174, 96, 0.3)' : 'rgba(39, 174, 96, 0.2)'}`
          }}>
            <div className="h4 mb-1" style={{ color: 'var(--success)' }}>94%</div>
            <div className="small" style={{ color: 'var(--text-secondary)' }}>Response Rate</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-top">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted small">
            <i className="bi bi-info-circle me-1"></i>
            Data updated today
          </span>
          <button className="btn btn-sm" style={{ 
            background: 'var(--primary)', 
            color: 'white',
            border: 'none'
          }}>
            <i className="bi bi-download me-1"></i>
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;