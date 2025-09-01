import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-2">
      {['EN', 'FR', 'AR'].map((lang) => (
        <button
          key={lang}
          className={`px-2 py-1 rounded ${
            language === lang
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setLanguage(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;