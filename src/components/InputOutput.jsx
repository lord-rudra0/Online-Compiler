const InputOutput = ({ input, onInputChange, output, isLoading }) => {
  return (
    <div className="input-output-container">
      <div className="input-section">
        <div className="section-header">
          <span className="section-title">Input</span>
          <span className="section-subtitle">Provide input for your program</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Enter input for your program here..."
          className="input-textarea"
          disabled={isLoading}
        />
      </div>
      
      <div className="output-section">
        <div className="section-header">
          <span className="section-title">Output</span>
          {isLoading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Executing...</span>
            </div>
          )}
        </div>
        <div className="output-container">
          {output ? (
            <pre className="output-content">{output}</pre>
          ) : (
            <div className="output-placeholder">
              Output will appear here after running your code
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputOutput;