import React from 'react';

const LanguageSelector = ({ onLanguageChange }) => {
  const handleChange = (event) => {
    onLanguageChange(event.target.value);
  };

  return (
    <div>
      <select 
        onChange={handleChange} 
        style={{ padding: '8px 12px', fontSize: '16px', borderRadius: '5px' }}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="c">C</option>
        <option value="php">PHP</option>
        <option value="go">Go</option>
        <option value="ruby">Ruby</option>
        {/* Add other languages as necessary */}
      </select>
    </div>
  );
};

export default LanguageSelector;
