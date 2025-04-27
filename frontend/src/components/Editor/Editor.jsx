import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import OutputBox from './output';
import { FaSun, FaMoon } from 'react-icons/fa';
import "./Editor.css";

function EditorBox() {
  const [theme, setTheme] = useState('vs-dark');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  // Handle theme change
  const themeChange = () => {
    setTheme(prevTheme => (prevTheme === 'vs-dark' ? 'light' : 'vs-dark'));
  };

  // Handle language change
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Handle code execution (simulated)
  const handleRun = () => {
    // For the sake of demonstration, we're just setting some output text
    // In your case, this would be the output from executing the code
    setOutput(`Output for ${language} code goes here.`);
  };

  return (
    <div className="editor-container">
        <div>
      <div className="editor-top">
        <LanguageSelector onLanguageChange={handleLanguageChange} />
        <button onClick={themeChange} style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>
          {theme === 'vs-dark' ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div>
        <Editor
          height="400px"
          width="400px"
          language={language}
          value={code}
          theme={theme}
          onChange={(value) => setCode(value)}
          options={{
            fontSize: 16,
            minimap: { enabled: false },
            automaticLayout: true
          }}
        />
      </div>

      <div className="editor-bottom">
        <button onClick={handleRun} style={{ fontSize: '24px', background: 'none', border: '3px solid black', cursor: 'pointer' }}>
          Run
        </button>
        <button onClick={() => setCode('')} style={{ fontSize: '24px', background: 'none', border: '3px solid black', cursor: 'pointer' }}>
          Clear
        </button>
      </div>
      </div>
      <div>
      <OutputBox language={language} output={output} />
      </div>
    </div>
  );
}

export default EditorBox;


// import React, { useState } from 'react';
// import Editor from '@monaco-editor/react';
// import "./Editor.css";
// import { FaSun, FaMoon } from 'react-icons/fa';
// import LanguageSelector from './LanguageSelector';

// function EditorBox() {
//   const [theme, setTheme] = useState('vs-dark'); 
//   const [language, setLanguage] = useState("javascript");
//   const [code, setCode] = useState("// Hello World");

//   // Function to handle theme change
//   function themeChange() {
//     setTheme(prevTheme => (prevTheme === 'vs-dark' ? 'light' : 'vs-dark'));
//   }

//   // Function to handle code clearing
//   function clearInput() {
//     setCode(""); // Clears the code from the editor
//   }

//   // Function to handle running the code
//   function runCode() {
//     console.log("Running code in", language);
//     console.log(code);
//     // Here you could integrate API calls or logic to execute the code
//   }

//   return (
//     <div className="editor-container">
//       <div className="editor-top">
//         <div>
//           <LanguageSelector selectedLanguage={language} setSelectedLanguage={setLanguage} />
//         </div>
//         <button onClick={themeChange} style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }}>
//           {theme === 'vs-dark' ? <FaSun /> : <FaMoon />}
//         </button>
//       </div>

//       <div>
//         <Editor
//           className="editor"
//           height="500px"
//           width="500px"     
//           language={language}
//           value={code}
//           theme={theme}
//           onChange={(value) => setCode(value)} // Update the code on editor change
//           options={{
//             fontSize: 16,
//             minimap: { enabled: false },
//             automaticLayout: true,
//           }}
//         />
//       </div>

//       <div className="editor-top">
//         <div>
//           <button onClick={clearInput} style={{ fontSize: '24px', marginTop: '10px', background: 'none', border: "3px solid black", cursor: 'pointer', padding: '10px 20px' }}>
//             Clear
//           </button>
//         </div>
//         <button onClick={runCode} style={{ fontSize: '24px', marginTop: '10px', background: 'none', border: "3px solid black", cursor: 'pointer', padding: '10px 20px' }}>
//           Run
//         </button>
//       </div>
//     </div>
//   );
// }

// export default EditorBox;
