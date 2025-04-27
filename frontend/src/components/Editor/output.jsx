import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FaSun, FaMoon } from 'react-icons/fa';

const OutputBox = ({ language, output }) => {
  const [theme, setTheme] = useState('vs-dark');
  
  // Toggle theme function
  const themeChange = () => {
    setTheme(prevTheme => (prevTheme === 'vs-dark' ? 'light' : 'vs-dark'));
  };

  const getMonacoLanguage = (lang) => {
    switch (lang) {
      case 'javascript':
        return 'javascript';
      case 'python':
        return 'python';
      case 'cpp':
      case 'c':
        return 'cpp';
      case 'java':
        return 'java';
      case 'ruby':
        return 'ruby';
      case 'go':
        return 'go';
      case 'php':
        return 'php';
      case 'bash':
        return 'shell';
      case 'swift':
        return 'swift';
      // Add more languages as necessary
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="output-container">
      <div className="output-top">
        <button 
          onClick={themeChange} 
          style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {theme === 'vs-dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="output-area">
        <Editor
          height="400px"
          language={getMonacoLanguage(language)}
          theme={theme}
          value={output || "// Output will appear here"}
          options={{
            readOnly: true,  // Make the output area read-only
            minimap: { enabled: false },
            automaticLayout: true,
            fontSize: 14,
            wordWrap: 'on',
            scrollBeyondLastLine: false
          }}
        />
      </div>
    </div>
  );
};

export default OutputBox;
