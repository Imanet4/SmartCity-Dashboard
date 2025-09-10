import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import CitySelector from './CitySelector';
import { useTheme } from '../../contexts/ThemeContext';
import { useCity } from '../../contexts/CityContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { selectedCity } = useCity();

  return (
    <header className="header-custom">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <h1 className="h2 mb-0 me-2">{selectedCity.toUpperCase()}</h1>
            <span className="fs-5">DASHBOARD</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <CitySelector />
            <LanguageSwitcher />
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <i className="bi bi-sun-fill"></i>
              ) : (
                <i className="bi bi-moon-fill"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;