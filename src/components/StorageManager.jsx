import { useState, useEffect } from 'react';

const StorageManager = ({ isOpen, onClose }) => {
  const [storageData, setStorageData] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [backupName, setBackupName] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadStorageData();
    }
  }, [isOpen]);

  const loadStorageData = () => {
    const data = {};
    const keys = [
      'codeFiles',
      'uploadedFiles',
      'editorSettings',
      'userPreferences',
      'recentFiles',
      'snippets',
      'themes'
    ];

    keys.forEach(key => {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          data[key] = JSON.parse(value);
        }
      } catch (error) {
        console.error(`Error loading ${key}:`, error);
      }
    });

    setStorageData(data);
  };

  const getStorageSize = () => {
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length;
      }
    }
    return formatBytes(totalSize);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getItemCount = (data) => {
    if (Array.isArray(data)) return data.length;
    if (typeof data === 'object') return Object.keys(data).length;
    return 0;
  };

  const handleDeleteItem = (key) => {
    if (confirm(`Are you sure you want to delete all ${key}?`)) {
      localStorage.removeItem(key);
      loadStorageData();
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedItems.length} selected items?`)) {
      selectedItems.forEach(key => {
        localStorage.removeItem(key);
      });
      setSelectedItems([]);
      loadStorageData();
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all local storage? This action cannot be undone.')) {
      localStorage.clear();
      loadStorageData();
    }
  };

  const handleBackup = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      name: backupName || `backup_${new Date().toISOString().split('T')[0]}`,
      data: {}
    };

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        try {
          backup.data[key] = JSON.parse(localStorage.getItem(key));
        } catch {
          backup.data[key] = localStorage.getItem(key);
        }
      }
    }

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${backup.name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowBackupDialog(false);
    setBackupName('');
  };

  const handleRestore = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        
        if (confirm(`Are you sure you want to restore backup "${backup.name}"? This will overwrite current data.`)) {
          // Clear current storage
          localStorage.clear();
          
          // Restore backup data
          Object.keys(backup.data).forEach(key => {
            localStorage.setItem(key, JSON.stringify(backup.data[key]));
          });
          
          loadStorageData();
          alert('Backup restored successfully!');
        }
      } catch (error) {
        alert('Error restoring backup. Invalid file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleSelectItem = (key) => {
    setSelectedItems(prev => 
      prev.includes(key) 
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const handleSelectAll = () => {
    const allKeys = Object.keys(storageData);
    setSelectedItems(prev => 
      prev.length === allKeys.length ? [] : allKeys
    );
  };

  if (!isOpen) return null;

  return (
    <div className="storage-overlay">
      <div className="storage-modal">
        <div className="storage-header">
          <h2>Storage Manager</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="storage-content">
          <div className="storage-summary">
            <div className="summary-item">
              <span className="summary-label">Total Size:</span>
              <span className="summary-value">{getStorageSize()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Items:</span>
              <span className="summary-value">{Object.keys(storageData).length}</span>
            </div>
          </div>

          <div className="storage-actions">
            <button className="storage-button primary" onClick={() => setShowBackupDialog(true)}>
              📦 Create Backup
            </button>
            <button className="storage-button secondary" onClick={() => document.getElementById('restore-input').click()}>
              📥 Restore Backup
            </button>
            <button className="storage-button danger" onClick={handleClearAll}>
              🗑️ Clear All
            </button>
          </div>

          <div className="storage-items">
            <div className="items-header">
              <label className="select-all">
                <input 
                  type="checkbox"
                  checked={selectedItems.length === Object.keys(storageData).length && Object.keys(storageData).length > 0}
                  onChange={handleSelectAll}
                />
                Select All
              </label>
              {selectedItems.length > 0 && (
                <button className="delete-selected" onClick={handleDeleteSelected}>
                  Delete Selected ({selectedItems.length})
                </button>
              )}
            </div>

            <div className="items-list">
              {Object.keys(storageData).length === 0 ? (
                <div className="no-items">
                  <p>No data in local storage</p>
                </div>
              ) : (
                Object.entries(storageData).map(([key, value]) => (
                  <div key={key} className="storage-item">
                    <div className="item-info">
                      <label className="item-checkbox">
                        <input 
                          type="checkbox"
                          checked={selectedItems.includes(key)}
                          onChange={() => handleSelectItem(key)}
                        />
                      </label>
                      <div className="item-details">
                        <span className="item-key">{key}</span>
                        <span className="item-count">
                          {getItemCount(value)} items • {formatBytes(JSON.stringify(value).length)}
                        </span>
                      </div>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="item-action-button"
                        onClick={() => handleDeleteItem(key)}
                        title="Delete this item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {showBackupDialog && (
          <div className="backup-dialog-overlay">
            <div className="backup-dialog">
              <h3>Create Backup</h3>
              <input
                type="text"
                placeholder="Backup name (optional)"
                value={backupName}
                onChange={(e) => setBackupName(e.target.value)}
                className="backup-name-input"
              />
              <div className="backup-actions">
                <button 
                  className="backup-button secondary"
                  onClick={() => {
                    setShowBackupDialog(false);
                    setBackupName('');
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="backup-button primary"
                  onClick={handleBackup}
                >
                  Create Backup
                </button>
              </div>
            </div>
          </div>
        )}

        <input
          id="restore-input"
          type="file"
          accept=".json"
          onChange={handleRestore}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default StorageManager; 