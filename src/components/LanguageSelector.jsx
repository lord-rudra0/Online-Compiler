import { useState, useEffect } from 'react';

const LanguageSelector = ({ selectedLanguage, onLanguageChange, languages }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (language) => {
    onLanguageChange(language);
    setIsOpen(false);
  };

  return (
    <div className="language-selector">
      <button 
        className="selector-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLanguage?.name || 'Select Language'}</span>
        <svg 
          className={`chevron ${isOpen ? 'open' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
        >
          <path 
            d="M4 6L8 10L12 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className="selector-dropdown">
          {languages.map((language) => (
            <button
              key={language.language}
              className={`dropdown-item ${selectedLanguage?.language === language.language ? 'selected' : ''}`}
              onClick={() => handleSelect(language)}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;