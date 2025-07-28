import { useState, useEffect } from 'react';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import LanguageSelector from './components/LanguageSelector';
import CodeEditor from './components/CodeEditor';
import InputOutput from './components/InputOutput';
import './App.css';

const API_BASE_URL = 'http://localhost:3001/api';

// Default code templates
const CODE_TEMPLATES = {
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  cpp14: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  cpp17: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  python2: 'print "Hello, World!"',
  python3: 'print("Hello, World!")',
  nodejs: 'console.log("Hello, World!");',
  csharp: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  php: '<?php\necho "Hello, World!";\n?>',
  ruby: 'puts "Hello, World!"',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  kotlin: 'fun main() {\n    println("Hello, World!")\n}',
  swift: 'print("Hello, World!")',
  rust: 'fn main() {\n    println!("Hello, World!");\n}',
  scala: 'object Main extends App {\n    println("Hello, World!")\n}',
  r: 'print("Hello, World!")',
  perl: 'print "Hello, World!\\n";',
  haskell: 'main = putStrLn "Hello, World!"',
  lua: 'print("Hello, World!")',
  pascal: 'program HelloWorld;\nbegin\n    writeln(\'Hello, World!\');\nend.',
  cobol: 'IDENTIFICATION DIVISION.\nPROGRAM-ID. HELLO.\nPROCEDURE DIVISION.\nDISPLAY \'Hello, World!\'.\nSTOP RUN.'
};

function App() {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  useEffect(() => {
    fetchLanguages();
    // Check for saved user session
    const savedUser = localStorage.getItem('coderunner_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/languages`);
      const data = await response.json();
      setLanguages(data);
      
      // Set default language to Python 3
      const defaultLang = data.find(lang => lang.language === 'python3');
      if (defaultLang) {
        setSelectedLanguage(defaultLang);
        setCode(CODE_TEMPLATES[defaultLang.language] || '');
      }
    } catch (error) {
      console.error('Failed to fetch languages:', error);
      setOutput('Error: Failed to load supported languages');
    }
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCode(CODE_TEMPLATES[language.language] || '');
    setOutput('');
  };

  const executeCode = async () => {
    if (!selectedLanguage || !code.trim()) {
      setOutput('Error: Please select a language and write some code');
      return;
    }

    setIsLoading(true);
    setOutput('');

    try {
      const response = await fetch(`${API_BASE_URL}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage.language,
          versionIndex: selectedLanguage.versionIndex,
          script: code,
          stdin: input
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.output) {
          setOutput(data.output);
        } else if (data.error) {
          setOutput(`Error: ${data.error}`);
        } else {
          setOutput('No output generated');
        }
      } else {
        setOutput(`Error: ${data.message || 'Failed to execute code'}`);
      }
    } catch (error) {
      console.error('Execution error:', error);
      setOutput(`Network Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem('coderunner_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('coderunner_user');
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'login' });
  };

  const switchAuthMode = () => {
    setAuthModal(prev => ({
      ...prev,
      mode: prev.mode === 'login' ? 'signup' : 'login'
    }));
  };

  return (
    <div className="app">
      <Header 
        onRun={executeCode}
        isLoading={isLoading}
        selectedLanguage={selectedLanguage}
        user={user}
        onAuthClick={() => openAuthModal('login')}
        onLogout={handleLogout}
      />
      
      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={closeAuthModal}
        onSwitchMode={switchAuthMode}
        onAuth={handleAuth}
      />
      
      <div className="app-content">
        <div className="controls-bar">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageChange}
            languages={languages}
          />
          
          {user && (
            <div className="user-greeting">
              Welcome back, <span className="user-name">{user.name}</span>!
            </div>
          )}
        </div>

        <div className="main-content">
          <div className="editor-panel">
            <CodeEditor
              value={code}
              onChange={setCode}
              language={selectedLanguage?.name || 'Select Language'}
              placeholder="Write your code here..."
            />
          </div>

          <div className="side-panel">
            <InputOutput
              input={input}
              onInputChange={setInput}
              output={output}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;