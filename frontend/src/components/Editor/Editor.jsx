import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './Editor.css';

const languages = [
  { id: 45, name: "Assembly (NASM 2.14.02)", monacoLang: "asm" },
  { id: 46, name: "Bash (5.0.0)", monacoLang: "shell" },
  { id: 47, name: "Basic (FBC 1.07.1)", monacoLang: "basic" },
  { id: 110, name: "C (Clang 19.1.7)", monacoLang: "c" },
  { id: 103, name: "C (GCC 14.1.0)", monacoLang: "c" },
  { id: 105, name: "C++ (GCC 14.1.0)", monacoLang: "cpp" },
  { id: 86, name: "Clojure (1.10.1)", monacoLang: "clojure" },
  { id: 51, name: "C# (Mono 6.6.0.161)", monacoLang: "csharp" },
  { id: 77, name: "COBOL (GnuCOBOL 2.2)", monacoLang: "cobol" },
  { id: 55, name: "Common Lisp (SBCL 2.0.0)", monacoLang: "lisp" },
  { id: 90, name: "Dart (2.19.2)", monacoLang: "dart" },
  { id: 56, name: "D (DMD 2.089.1)", monacoLang: "d" },
  { id: 57, name: "Elixir (1.9.4)", monacoLang: "elixir" },
  { id: 58, name: "Erlang (OTP 22.2)", monacoLang: "erlang" },
  { id: 87, name: "F# (.NET Core SDK 3.1.202)", monacoLang: "fsharp" },
  { id: 59, name: "Fortran (GFortran 9.2.0)", monacoLang: "fortran" },
  { id: 107, name: "Go (1.23.5)", monacoLang: "go" },
  { id: 88, name: "Groovy (3.0.3)", monacoLang: "groovy" },
  { id: 61, name: "Haskell (GHC 8.8.1)", monacoLang: "haskell" },
  { id: 91, name: "Java (JDK 17.0.6)", monacoLang: "java" },
  { id: 96, name: "JavaFX (JDK 17.0.6, OpenJFX 22.0.2)", monacoLang: "java" },
  { id: 102, name: "JavaScript (Node.js 22.08.0)", monacoLang: "javascript" },
  { id: 111, name: "Kotlin (2.1.10)", monacoLang: "kotlin" },
  { id: 64, name: "Lua (5.3.5)", monacoLang: "lua" },
  { id: 79, name: "Objective-C (Clang 7.0.1)", monacoLang: "objective-c" },
  { id: 65, name: "OCaml (4.09.0)", monacoLang: "ocaml" },
  { id: 66, name: "Octave (5.1.0)", monacoLang: "matlab" },
  { id: 67, name: "Pascal (FPC 3.0.4)", monacoLang: "pascal" },
  { id: 85, name: "Perl (5.28.1)", monacoLang: "perl" },
  { id: 98, name: "PHP (8.3.11)", monacoLang: "php" },
  { id: 69, name: "Prolog (GNU Prolog 1.4.5)", monacoLang: "prolog" },
  { id: 109, name: "Python (3.13.2)", monacoLang: "python" },
  { id: 99, name: "R (4.4.1)", monacoLang: "r" },
  { id: 72, name: "Ruby (2.7.0)", monacoLang: "ruby" },
  { id: 108, name: "Rust (1.85.0)", monacoLang: "rust" },
  { id: 81, name: "Scala (2.13.2)", monacoLang: "scala" },
  { id: 82, name: "SQL (SQLite 3.27.2)", monacoLang: "sql" },
  { id: 83, name: "Swift (5.2.3)", monacoLang: "swift" },
  { id: 101, name: "TypeScript (5.6.2)", monacoLang: "typescript" },
  { id: 84, name: "Visual Basic.Net (vbnc 0.0.0.5943)", monacoLang: "vb" }
];

const defaultTemplates = {
  'c': `#include <stdio.h>

int main() {
  printf("Hello, World!\\n");
  return 0;
}`,
  'cpp': `#include <iostream>

int main() {
  std::cout << "Hello, World!" << std::endl;
  return 0;
}`,
  'python': `print("Hello, World!")`,
  'java': `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
  'javascript': `console.log("Hello, World!");`,
  'php': `<?php
echo "Hello, World!";
?>`,
  'ruby': `puts "Hello, World!"`,
  'go': `package main

import "fmt"

func main() {
  fmt.Println("Hello, World!")
}`,
  'rust': `fn main() {
  println!("Hello, World!");
}`,
  'swift': `print("Hello, World!")`,
  'kotlin': `fun main() {
  println("Hello, World!")
}`
};

function EditorBox() {
  const defaultLanguage = languages.find(lang => lang.id === 103) || languages[0];
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(defaultTemplates[defaultLanguage.monacoLang] || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [theme, setTheme] = useState('vs-light');

  useEffect(() => {
    if (!selectedLanguage) return;
    
    const template = defaultTemplates[selectedLanguage.monacoLang] || 
      `// Write your ${selectedLanguage.name.split(' ')[0]} code here`;
    setCode(template);
    setOutput('');
  }, [selectedLanguage]);

  const handleRunCode = () => {
    if (isRunning || !selectedLanguage) return;
    
    setIsRunning(true);
    setOutput('$ Running...\n');
    setExecutionTime(0);
    
    const startTime = performance.now();
    
    setTimeout(() => {
      const endTime = performance.now();
      const timeTaken = (endTime - startTime) / 1000;
      setExecutionTime(timeTaken);
      
      let simulatedOutput = `$ Running...\nHello, World!\n\nProgram executed successfully in ${timeTaken.toFixed(2)} seconds.\n`;
      setOutput(simulatedOutput);
      setIsRunning(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleLanguageChange = (e) => {
    const langId = parseInt(e.target.value);
    const lang = languages.find(l => l.id === langId);
    if (lang) setSelectedLanguage(lang);
  };

  const handleClearOutput = () => setOutput('');
  const toggleTheme = () => setTheme(theme === 'vs-light' ? 'vs-dark' : 'vs-light');

  if (!selectedLanguage) {
    return <div className="error-message">Error: No language selected</div>;
  }

  return (
    <div className="compiler-wrapper">
      <div className="compiler-container">
        <div className="editor-section">
          <div className="editor-toolbar">
            <div className="language-selector-container">
              <select 
                className="language-selector"
                value={selectedLanguage.id}
                onChange={handleLanguageChange}
                disabled={isRunning}
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
            </div>
            
            <div className="toolbar-controls">
              <button 
                className="theme-toggle"
                onClick={toggleTheme}
                title={theme === 'vs-light' ? 'Dark Mode' : 'Light Mode'}
              >
                {theme === 'vs-light' ? '🌙' : '☀️'}
              </button>
              
              <button 
                className={`run-button ${isRunning ? 'disabled' : ''}`}
                onClick={handleRunCode}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <span className="spinner"></span> Running
                  </>
                ) : (
                  <>
                    <span className="play-icon">▶</span> Run
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="code-editor-container">
            <Editor
              height="100%"
              language={selectedLanguage.monacoLang}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={theme}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                fontFamily: "'Fira Code', Consolas, 'Courier New', monospace",
                wordWrap: 'on',
                renderWhitespace: 'none',
                lineNumbers: 'on',
                glyphMargin: false,
                folding: false,
                lineDecorationsWidth: 10,
                renderLineHighlight: 'none'
              }}
            />
          </div>
        </div>
        
        <div className="output-section">
          <div className="output-header">
            <div className="output-title">Output</div>
            <div className="output-controls">
              {executionTime > 0 && (
                <div className="execution-time">
                  ⏱️ {executionTime.toFixed(2)}s
                </div>
              )}
              <button 
                className="clear-button"
                onClick={handleClearOutput}
                disabled={!output}
              >
                🗑️ Clear
              </button>
            </div>
          </div>
          <div className="output-content">
            <pre className={`output-text ${!output ? 'empty' : ''}`}>
              {output || 'Output will be displayed here after execution'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorBox;