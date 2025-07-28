import { useState, useEffect } from 'react';

const FileManager = ({ isOpen, onClose, onLoadFile, currentCode, currentLanguage }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [fileName, setFileName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load saved files from localStorage
    const savedFiles = localStorage.getItem('codeFiles');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  const saveFilesToStorage = (newFiles) => {
    localStorage.setItem('codeFiles', JSON.stringify(newFiles));
    setFiles(newFiles);
  };

  const handleSaveFile = () => {
    if (!fileName.trim()) return;

    const newFile = {
      id: Date.now(),
      name: fileName.trim(),
      code: currentCode,
      language: currentLanguage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newFiles = [...files, newFile];
    saveFilesToStorage(newFiles);
    setShowSaveDialog(false);
    setFileName('');
  };

  const handleLoadFile = (file) => {
    onLoadFile(file.code, file.language);
    setSelectedFile(file);
  };

  const handleDeleteFile = (fileId) => {
    const newFiles = files.filter(file => file.id !== fileId);
    saveFilesToStorage(newFiles);
    if (selectedFile && selectedFile.id === fileId) {
      setSelectedFile(null);
    }
  };

  const handleUpdateFile = (fileId) => {
    const newFiles = files.map(file => 
      file.id === fileId 
        ? { ...file, code: currentCode, updatedAt: new Date().toISOString() }
        : file
    );
    saveFilesToStorage(newFiles);
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (language) => {
    const icons = {
      python3: '🐍',
      python2: '🐍',
      javascript: '📜',
      nodejs: '🟢',
      java: '☕',
      cpp: '⚡',
      c: '🔧',
      csharp: '💎',
      php: '🐘',
      ruby: '💎',
      go: '🐹',
      rust: '🦀',
      swift: '🍎',
      kotlin: '🔷',
      scala: '🔴',
      r: '📊',
      perl: '🐪',
      haskell: 'λ',
      lua: '🌙',
      pascal: '📝',
      cobol: '💼'
    };
    return icons[language] || '📄';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString() + ' ' + 
           new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="file-manager-overlay">
      <div className="file-manager-modal">
        <div className="file-manager-header">
          <h2>File Manager</h2>
          <div className="file-manager-actions">
            <button 
              className="file-manager-button primary"
              onClick={() => setShowSaveDialog(true)}
            >
              Save Current
            </button>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
        </div>

        <div className="file-manager-content">
          <div className="file-search">
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="file-search-input"
            />
          </div>

          <div className="files-list">
            {filteredFiles.length === 0 ? (
              <div className="no-files">
                <div className="no-files-icon">📁</div>
                <p>No saved files yet</p>
                <p className="no-files-hint">Save your current code to get started</p>
              </div>
            ) : (
              filteredFiles.map(file => (
                <div 
                  key={file.id} 
                  className={`file-item ${selectedFile?.id === file.id ? 'selected' : ''}`}
                >
                  <div className="file-info" onClick={() => handleLoadFile(file)}>
                    <span className="file-icon">{getFileIcon(file.language)}</span>
                    <div className="file-details">
                      <span className="file-name">{file.name}</span>
                      <span className="file-meta">
                        {file.language} • {formatDate(file.updatedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="file-actions">
                    <button 
                      className="file-action-button"
                      onClick={() => handleUpdateFile(file.id)}
                      title="Update with current code"
                    >
                      🔄
                    </button>
                    <button 
                      className="file-action-button delete"
                      onClick={() => handleDeleteFile(file.id)}
                      title="Delete file"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {showSaveDialog && (
          <div className="save-dialog-overlay">
            <div className="save-dialog">
              <h3>Save File</h3>
              <input
                type="text"
                placeholder="Enter file name..."
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="save-dialog-input"
                autoFocus
              />
              <div className="save-dialog-actions">
                <button 
                  className="save-dialog-button secondary"
                  onClick={() => {
                    setShowSaveDialog(false);
                    setFileName('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="save-dialog-button primary"
                  onClick={handleSaveFile}
                  disabled={!fileName.trim()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager; 