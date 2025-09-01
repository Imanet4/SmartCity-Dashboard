import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import CitySelector from './CitySelector';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-800">AGADIR</h1>
        <span className="ml-2 text-gray-600">DASHBOARD</span>
      </div>
      <div className="flex items-center space-x-4">
        <CitySelector />
        <LanguageSwitcher />
      </div>
    </header>
  );
};

export default Header;