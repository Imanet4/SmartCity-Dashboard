import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import CitySelector from './CitySelector';
import { useTheme } from '../../contexts/ThemeContext';
import { BiSun, BiMoon } from 'react-icons/bi';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
   <header className="header-custom">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <h1 className="h3 mb-0 me-2 text-primary-custom">AGADIR</h1>
            <span className="text-muted">DASHBOARD</span>
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
                <BiSun size={20} />
              ) : (
                <BiMoon size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;