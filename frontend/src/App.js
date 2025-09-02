import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CityProvider } from './contexts/CityContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CityProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
            
              </Routes>
            </div>
          </Router>
        </CityProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;