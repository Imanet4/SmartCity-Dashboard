import React from 'react';
import { useCity } from '../../contexts/CityContext';

const CitySelector = () => {
  const { selectedCity, setSelectedCity } = useCity();
  const cities = ['Agadir', 'Marrakech', 'Casablanca', 'Rabat'];

  return (
    <select
      className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={selectedCity}
      onChange={(e) => setSelectedCity(e.target.value)}
    >
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
};

export default CitySelector;