import { useState, useRef } from 'react';

const FileUpload = ({ isOpen, onClose, onFileUpload, supportedLanguages }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const fileExtensions = {
    '.py': 'python3',
    '.js': 'javascript',
    '.ts': 'typescript',
    '.java': 'java',
    '.cpp': 'cpp',
    '.cc': 'cpp',
    '.cxx': 'cpp',
    '.c': 'c',
    '.cs': 'csharp',
    '.php': 'php',
    '.rb': 'ruby',
    '.go': 'go',
    '.rs': 'rust',
    '.swift': 'swift',
    '.kt': 'kotlin',
    '.scala': 'scala',
    '.r': 'r',
    '.pl': 'perl',
    '.hs': 'haskell',
    '.lua': 'lua',
    '.pas': 'pascal',
    '.cob': 'cobol',
    '.cbl': 'cobol',
    '.html': 'html',
    '.css': 'css',
    '.sql': 'sql',
    '.sh': 'bash',
    '.ps1': 'powershell',
    '.bat': 'batch',
    '.md': 'markdown',
    '.json': 'json',
    '.xml': 'xml',
    '.yaml': 'yaml',
    '.yml': 'yaml'
  };

  const detectLanguage = (filename) => {
    const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    return fileExtensions[extension] || 'text';
  };

  const findLanguageObject = (languageId) => {
    return supportedLanguages.find(lang => lang.language === languageId) || null;
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const content = await readFileContent(file);
      const detectedLanguage = detectLanguage(file.name);
      const languageObject = findLanguageObject(detectedLanguage);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Add to local storage
      const fileData = {
        id: Date.now(),
        name: file.name,
        code: content,
        language: detectedLanguage,
        languageObject: languageObject,
        size: file.size,
        lastModified: file.lastModified,
        uploadedAt: new Date().toISOString()
      };

      saveToLocalStorage(fileData);

      // Call the callback with file data
      onFileUpload(fileData);

      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
        onClose();
      }, 500);

    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
      setUploadProgress(0);
      alert('Error uploading file. Please try again.');
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const saveToLocalStorage = (fileData) => {
    try {
      const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      existingFiles.unshift(fileData); // Add to beginning
      
      // Keep only last 50 files
      if (existingFiles.length > 50) {
        existingFiles.splice(50);
      }
      
      localStorage.setItem('uploadedFiles', JSON.stringify(existingFiles));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <div className="upload-overlay">
      <div className="upload-modal">
        <div className="upload-header">
          <h2>Upload File</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="upload-content">
          {uploading ? (
            <div className="upload-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="progress-text">Uploading... {uploadProgress}%</p>
            </div>
          ) : (
            <div 
              className={`upload-area ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="upload-icon">📁</div>
              <h3>Drop your file here</h3>
              <p>or</p>
              <button 
                className="browse-button"
                onClick={handleBrowseClick}
                disabled={uploading}
              >
                Browse Files
              </button>
              <p className="upload-hint">
                Supported formats: .py, .js, .java, .cpp, .c, .cs, .php, .rb, .go, .rs, .swift, .kt, .scala, .r, .pl, .hs, .lua, .pas, .cob, .html, .css, .sql, .sh, .md, .json, .xml, .yaml
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".py,.js,.ts,.java,.cpp,.cc,.cxx,.c,.cs,.php,.rb,.go,.rs,.swift,.kt,.scala,.r,.pl,.hs,.lua,.pas,.cob,.cbl,.html,.css,.sql,.sh,.ps1,.bat,.md,.json,.xml,.yaml,.yml"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </div>

        <div className="upload-footer">
          <div className="upload-info">
            <h4>Supported Languages:</h4>
            <div className="language-list">
              {Object.values(fileExtensions).slice(0, 12).map((lang, index) => (
                <span key={index} className="language-tag">{lang}</span>
              ))}
              <span className="language-tag">+ more</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload; 