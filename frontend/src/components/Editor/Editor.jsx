import React from 'react';
import Editor from '@monaco-editor/react';
import "./Editor.css";

const EditorBox = () => {
  return (
    <div 
      className="editor" 
    //   style={{ height: '500px', backgroundColor: 'rgb(233, 61, 61)' }}
    >
      <Editor
        height="500px"
        width="500px"
        language="javascript"
        value="// Hello World"
        theme="vs-dark"
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default EditorBox;
