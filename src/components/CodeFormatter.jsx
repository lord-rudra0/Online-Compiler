import { useState } from 'react';

const CodeFormatter = ({ isOpen, onClose, onFormatCode, currentCode, currentLanguage }) => {
  const [formattingOptions, setFormattingOptions] = useState({
    indentSize: 2,
    useSpaces: true,
    removeTrailingWhitespace: true,
    addFinalNewline: true,
    maxLineLength: 80
  });

  const formatCode = () => {
    let formattedCode = currentCode;

    // Basic formatting based on language
    switch (currentLanguage) {
      case 'python3':
      case 'python2':
        formattedCode = formatPythonCode(formattedCode, formattingOptions);
        break;
      case 'javascript':
      case 'nodejs':
        formattedCode = formatJavaScriptCode(formattedCode, formattingOptions);
        break;
      case 'java':
        formattedCode = formatJavaCode(formattedCode, formattingOptions);
        break;
      case 'cpp':
      case 'cpp14':
      case 'cpp17':
        formattedCode = formatCppCode(formattedCode, formattingOptions);
        break;
      default:
        formattedCode = formatGenericCode(formattedCode, formattingOptions);
    }

    onFormatCode(formattedCode);
    onClose();
  };

  const formatPythonCode = (code, options) => {
    let lines = code.split('\n');
    let indentLevel = 0;
    let formattedLines = [];

    for (let line of lines) {
      // Remove trailing whitespace
      if (options.removeTrailingWhitespace) {
        line = line.trimEnd();
      }

      // Skip empty lines
      if (line.trim() === '') {
        formattedLines.push('');
        continue;
      }

      // Handle indentation
      const trimmedLine = line.trim();
      
      // Decrease indent for certain keywords
      if (trimmedLine.startsWith('return') || 
          trimmedLine.startsWith('break') || 
          trimmedLine.startsWith('continue') ||
          trimmedLine.startsWith('pass')) {
        // Keep current indent level
      } else if (trimmedLine.startsWith('elif ') || 
                 trimmedLine.startsWith('else:') ||
                 trimmedLine.startsWith('except') ||
                 trimmedLine.startsWith('finally:')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // Add proper indentation
      const indent = options.useSpaces ? ' '.repeat(indentLevel * options.indentSize) : '\t'.repeat(indentLevel);
      formattedLines.push(indent + trimmedLine);

      // Increase indent for certain keywords
      if (trimmedLine.endsWith(':') && 
          !trimmedLine.startsWith('#') && 
          !trimmedLine.startsWith('"""') &&
          !trimmedLine.startsWith("'''")) {
        indentLevel++;
      }
    }

    let result = formattedLines.join('\n');
    
    // Add final newline
    if (options.addFinalNewline && !result.endsWith('\n')) {
      result += '\n';
    }

    return result;
  };

  const formatJavaScriptCode = (code, options) => {
    let lines = code.split('\n');
    let indentLevel = 0;
    let formattedLines = [];
    let inString = false;
    let stringChar = '';

    for (let line of lines) {
      // Remove trailing whitespace
      if (options.removeTrailingWhitespace) {
        line = line.trimEnd();
      }

      // Skip empty lines
      if (line.trim() === '') {
        formattedLines.push('');
        continue;
      }

      const trimmedLine = line.trim();
      
      // Handle indentation
      if (trimmedLine.includes('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indent = options.useSpaces ? ' '.repeat(indentLevel * options.indentSize) : '\t'.repeat(indentLevel);
      formattedLines.push(indent + trimmedLine);

      if (trimmedLine.includes('{')) {
        indentLevel++;
      }
    }

    let result = formattedLines.join('\n');
    
    if (options.addFinalNewline && !result.endsWith('\n')) {
      result += '\n';
    }

    return result;
  };

  const formatJavaCode = (code, options) => {
    let lines = code.split('\n');
    let indentLevel = 0;
    let formattedLines = [];

    for (let line of lines) {
      if (options.removeTrailingWhitespace) {
        line = line.trimEnd();
      }

      if (line.trim() === '') {
        formattedLines.push('');
        continue;
      }

      const trimmedLine = line.trim();
      
      if (trimmedLine.includes('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indent = options.useSpaces ? ' '.repeat(indentLevel * options.indentSize) : '\t'.repeat(indentLevel);
      formattedLines.push(indent + trimmedLine);

      if (trimmedLine.includes('{')) {
        indentLevel++;
      }
    }

    let result = formattedLines.join('\n');
    
    if (options.addFinalNewline && !result.endsWith('\n')) {
      result += '\n';
    }

    return result;
  };

  const formatCppCode = (code, options) => {
    let lines = code.split('\n');
    let indentLevel = 0;
    let formattedLines = [];

    for (let line of lines) {
      if (options.removeTrailingWhitespace) {
        line = line.trimEnd();
      }

      if (line.trim() === '') {
        formattedLines.push('');
        continue;
      }

      const trimmedLine = line.trim();
      
      if (trimmedLine.includes('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indent = options.useSpaces ? ' '.repeat(indentLevel * options.indentSize) : '\t'.repeat(indentLevel);
      formattedLines.push(indent + trimmedLine);

      if (trimmedLine.includes('{')) {
        indentLevel++;
      }
    }

    let result = formattedLines.join('\n');
    
    if (options.addFinalNewline && !result.endsWith('\n')) {
      result += '\n';
    }

    return result;
  };

  const formatGenericCode = (code, options) => {
    let lines = code.split('\n');
    let formattedLines = [];

    for (let line of lines) {
      if (options.removeTrailingWhitespace) {
        line = line.trimEnd();
      }
      formattedLines.push(line);
    }

    let result = formattedLines.join('\n');
    
    if (options.addFinalNewline && !result.endsWith('\n')) {
      result += '\n';
    }

    return result;
  };

  const handleOptionChange = (key, value) => {
    setFormattingOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="formatter-overlay">
      <div className="formatter-modal">
        <div className="formatter-header">
          <h2>Code Formatter</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="formatter-content">
          <div className="formatter-options">
            <h3>Formatting Options</h3>
            
            <div className="formatter-option">
              <label>Indent Size:</label>
              <select 
                value={formattingOptions.indentSize}
                onChange={(e) => handleOptionChange('indentSize', parseInt(e.target.value))}
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>8 spaces</option>
              </select>
            </div>

            <div className="formatter-option">
              <label>
                <input 
                  type="checkbox"
                  checked={formattingOptions.useSpaces}
                  onChange={(e) => handleOptionChange('useSpaces', e.target.checked)}
                />
                Use spaces instead of tabs
              </label>
            </div>

            <div className="formatter-option">
              <label>
                <input 
                  type="checkbox"
                  checked={formattingOptions.removeTrailingWhitespace}
                  onChange={(e) => handleOptionChange('removeTrailingWhitespace', e.target.checked)}
                />
                Remove trailing whitespace
              </label>
            </div>

            <div className="formatter-option">
              <label>
                <input 
                  type="checkbox"
                  checked={formattingOptions.addFinalNewline}
                  onChange={(e) => handleOptionChange('addFinalNewline', e.target.checked)}
                />
                Add final newline
              </label>
            </div>

            <div className="formatter-option">
              <label>Max line length:</label>
              <input 
                type="number"
                value={formattingOptions.maxLineLength}
                onChange={(e) => handleOptionChange('maxLineLength', parseInt(e.target.value))}
                min="40"
                max="200"
              />
            </div>
          </div>

          <div className="formatter-preview">
            <h3>Preview</h3>
            <div className="preview-info">
              <span>Language: {currentLanguage}</span>
              <span>Lines: {currentCode.split('\n').length}</span>
              <span>Characters: {currentCode.length}</span>
            </div>
          </div>
        </div>

        <div className="formatter-footer">
          <button className="formatter-button secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="formatter-button primary" onClick={formatCode}>
            Format Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeFormatter; 