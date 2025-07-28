import { useState, useRef, useEffect } from 'react';

const CodeEditor = ({ value, onChange, language, placeholder }) => {
  const textareaRef = useRef(null);
  const [lineCount, setLineCount] = useState(1);
  const [currentLine, setCurrentLine] = useState(1);
  const [currentColumn, setCurrentColumn] = useState(1);
  const [showLineHighlight, setShowLineHighlight] = useState(true);

  useEffect(() => {
    if (value) {
      const lines = value.split('\n').length;
      setLineCount(lines);
    } else {
      setLineCount(1);
    }
  }, [value]);

  const handleScroll = (e) => {
    const lineNumbers = document.querySelector('.line-numbers');
    if (lineNumbers) {
      lineNumbers.scrollTop = e.target.scrollTop;
    }
  };

  const handleLineNumbersScroll = (e) => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = e.target.scrollTop;
    }
  };

  const handleKeyDown = (e) => {
    const { key, ctrlKey, shiftKey, metaKey } = e;
    
    // Tab handling
    if (key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      
      if (shiftKey) {
        // Shift+Tab: Remove indentation
        const lines = value.split('\n');
        const currentLineIndex = value.substring(0, start).split('\n').length - 1;
        const currentLineText = lines[currentLineIndex];
        
        if (currentLineText.startsWith('  ')) {
          const newLineText = currentLineText.substring(2);
          lines[currentLineIndex] = newLineText;
          const newValue = lines.join('\n');
          onChange(newValue);
          
          setTimeout(() => {
            e.target.selectionStart = e.target.selectionEnd = start - 2;
          }, 0);
        }
      } else {
        // Tab: Add indentation
        const newValue = value.substring(0, start) + '  ' + value.substring(end);
        onChange(newValue);
        
        setTimeout(() => {
          e.target.selectionStart = e.target.selectionEnd = start + 2;
        }, 0);
      }
    }
    
    // Ctrl+S: Save (prevent default browser save)
    if ((ctrlKey || metaKey) && key === 's') {
      e.preventDefault();
      // You can add save functionality here
      console.log('Save triggered');
    }
    
    // Ctrl+Z: Undo (prevent default browser undo)
    if ((ctrlKey || metaKey) && key === 'z' && !shiftKey) {
      e.preventDefault();
      // You can add custom undo functionality here
    }
    
    // Ctrl+Y or Ctrl+Shift+Z: Redo
    if ((ctrlKey || metaKey) && (key === 'y' || (key === 'z' && shiftKey))) {
      e.preventDefault();
      // You can add custom redo functionality here
    }
    
    // Ctrl+A: Select all
    if ((ctrlKey || metaKey) && key === 'a') {
      e.preventDefault();
      e.target.select();
    }
    
    // Ctrl+D: Duplicate line
    if ((ctrlKey || metaKey) && key === 'd') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const lines = value.split('\n');
      const currentLineIndex = value.substring(0, start).split('\n').length - 1;
      
      if (start === end) {
        // No selection, duplicate current line
        const currentLineText = lines[currentLineIndex];
        lines.splice(currentLineIndex + 1, 0, currentLineText);
        const newValue = lines.join('\n');
        onChange(newValue);
        
        setTimeout(() => {
          const newCursorPos = value.substring(0, start).length + currentLineText.length + 1;
          e.target.selectionStart = e.target.selectionEnd = newCursorPos;
        }, 0);
      }
    }
  };

  const handleInput = (e) => {
    const { value: newValue, selectionStart } = e.target;
    onChange(newValue);
    
    // Update cursor position
    const lines = newValue.substring(0, selectionStart).split('\n');
    setCurrentLine(lines.length);
    setCurrentColumn(lines[lines.length - 1].length + 1);
  };

  const handleClick = (e) => {
    const { selectionStart } = e.target;
    const lines = value.substring(0, selectionStart).split('\n');
    setCurrentLine(lines.length);
    setCurrentColumn(lines[lines.length - 1].length + 1);
  };

  const getLanguageColor = () => {
    const colors = {
      python3: '#3776ab',
      python2: '#3776ab',
      javascript: '#f7df1e',
      nodejs: '#339933',
      java: '#007396',
      cpp: '#00599c',
      c: '#a8b9cc',
      csharp: '#178600',
      php: '#777bb4',
      ruby: '#cc342d',
      go: '#00add8',
      rust: '#ce422b',
      swift: '#ffac45',
      kotlin: '#f18e33',
      scala: '#dc322f',
      r: '#276dc3',
      perl: '#39457e',
      haskell: '#5d4f85',
      lua: '#000080',
      pascal: '#e3f171',
      cobol: '#ff6b6b'
    };
    return colors[language.toLowerCase()] || '#58a6ff';
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <span className="editor-title">Code Editor</span>
        <div className="editor-info">
          <span className="cursor-position">
            Ln {currentLine}, Col {currentColumn}
          </span>
          <span className="language-badge" style={{ backgroundColor: getLanguageColor() }}>
            {language}
          </span>
        </div>
      </div>
      <div className="editor-container">
        <div className="line-numbers" onScroll={handleLineNumbersScroll}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div 
              key={i + 1} 
              className={`line-number ${showLineHighlight && currentLine === i + 1 ? 'current-line' : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="editor-content">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            placeholder={placeholder}
            className="code-textarea"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          {showLineHighlight && (
            <div 
              className="line-highlight"
              style={{ 
                top: `${(currentLine - 1) * 21}px`,
                height: '21px'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;