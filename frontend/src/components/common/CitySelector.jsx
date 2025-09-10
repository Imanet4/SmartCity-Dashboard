import React, { useState } from 'react';
import { useCity } from '../../contexts/CityContext';

const CitySelector = () => {
  const { selectedCity, setSelectedCity } = useCity();
  const [isOpen, setIsOpen] = useState(false);
  const cities = ['Agadir', 'Marrakech', 'Casablanca', 'Rabat'];

  return (
    <div className="custom-city-selector">
      <div 
        className="selector-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          color: 'white',
          borderRadius: '20px',
          padding: '0.4rem 1rem',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <i className="bi bi-geo-alt"></i>
        <span>{selectedCity}</span>
        <i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </div>
      
      {isOpen && (
        <div className="city-dropdown">
          {cities.map((city) => (
            <div
              key={city}
              className={`city-option ${selectedCity === city ? 'active' : ''}`}
              onClick={() => {
                setSelectedCity(city);
                setIsOpen(false);
              }}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySelector;