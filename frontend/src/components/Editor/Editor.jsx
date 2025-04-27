import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import "./Editor.css";
import { FaSun, FaMoon } from 'react-icons/fa';
import LanguageSelector from './LanguageSelector';



function EditorBox() {
  const [theme, setTheme] = useState('vs-dark'); 
  const [language,setlanguage]=useState("javascript")

  function themeChange() {
    
    setTheme(prevTheme => (prevTheme === 'vs-dark' ? 'light' : 'vs-dark'));
  }

  return (
    <div className="editor-container">
        <div>
            <div>
                <LanguageSelector />
            </div>
              <button onClick={themeChange} style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>
                {theme === 'vs-dark' ? <FaSun /> : <FaMoon />}
              </button>
        </div>
        <div>
    


      <Editor
        className="editor"
        height="500px"
        width="500px"     
        language={language}
        value="// Hello World"
        theme={theme}
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
