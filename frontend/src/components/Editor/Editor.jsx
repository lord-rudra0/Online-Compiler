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

  function clearInput()
  {
    console.log("clear");
  }

  return (
    <div className="editor-container">
        <div className="editor-top">
            <div>
                <LanguageSelector />
            </div>
              <button onClick={themeChange} style={{ fontSize: '24px' , background: 'none', border: 'none', cursor: 'pointer' }}>
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

        <div className="editor-top">
            <div>
                <button onClick={clearInput} style={{ fontSize: '24px',marginTop:'10px', background: 'none', border:"3px solid black", cursor: 'pointer'  }}> Clear
                </button>
            </div>
              <button onClick={clearInput} style={{ fontSize: '24px',marginTop:'10px', background: 'none', border:"3px solid black", cursor: 'pointer'  }}> Run
              </button>
        </div>

    </div>
  );
}

export default EditorBox;
