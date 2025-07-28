import { useState, useRef, useEffect } from 'react';

const CodeEditor = ({ value, onChange, language, placeholder }) => {
  const textareaRef = useRef(null);
  const [lineCount, setLineCount] = useState(1);

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
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <span className="editor-title">Code Editor</span>
        <span className="language-badge">{language}</span>
      </div>
      <div className="editor-container">
        <div className="line-numbers" onScroll={handleLineNumbersScroll}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="line-number">
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="code-textarea"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default CodeEditor;