import React from 'react';
import Editor from '@monaco-editor/react';
import './Editor.css';

const OutputBox = ({ language, output }) => {
  return (
    <div className="output-box">
      <h3>Output</h3>
      <Editor
        height="200px"
        width="100%"
        language="plaintext"
        value={output || "Output will appear here"}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          automaticLayout: true,
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default OutputBox;
