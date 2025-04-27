import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import "./Editor.css";
import { FaSun, FaMoon } from 'react-icons/fa';



function EditorBox() {
  const [theme, setTheme] = useState('vs-dark'); 

  function themeChange() {
    // Toggle between vs-dark and light
    setTheme(prevTheme => (prevTheme === 'vs-dark' ? 'light' : 'vs-dark'));
  }

  return (
    <div>
        <div>
      <button onClick={themeChange} style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>
        {theme === 'vs-dark' ? <FaSun /> : <FaMoon />}
      </button>

      <Editor
        className="editor"
        height="500px"
        width="500px"     
        language="javascript"
        value="// Hello World"
        theme={theme}    // set the theme here
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
    </div>
  );
}

export default EditorBox;
