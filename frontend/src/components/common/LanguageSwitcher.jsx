import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      {['EN', 'FR', 'AR'].map((lang) => (
        <button
          key={lang}
          className={`language-btn ${language === lang ? 'active' : ''}`}
          onClick={() => setLanguage(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;