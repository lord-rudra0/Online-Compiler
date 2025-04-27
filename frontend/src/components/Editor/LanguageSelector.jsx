import React from 'react';
import './Editor.css';

const LanguageSelector = ({ onLanguageChange }) => {
  const handleChange = (event) => {
    onLanguageChange(event.target.value);
  };

  return (
    <div className="language-selector">
      <select onChange={handleChange} className="language-select">
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="ruby">Ruby</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
