import React, { useState } from 'react';

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    console.log("Selected language:", e.target.value);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <select 
        value={selectedLanguage} 
        onChange={handleLanguageChange}
        // style={{ padding: '8px 12px', fontSize: '16px', borderRadius: '5px' }}
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="c">C</option>
        <option value="php">PHP</option>
        <option value="go">Go</option>
        <option value="ruby">Ruby</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
