import { useState } from 'react';

const EditorSettings = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [activeTab, setActiveTab] = useState('general');

  const themes = [
    { id: 'dark', name: 'Dark', preview: '#0d1117' },
    { id: 'light', name: 'Light', preview: '#ffffff' },
    { id: 'monokai', name: 'Monokai', preview: '#272822' },
    { id: 'dracula', name: 'Dracula', preview: '#282a36' },
    { id: 'github', name: 'GitHub', preview: '#f6f8fa' },
    { id: 'vs-code', name: 'VS Code', preview: '#1e1e1e' }
  ];

  const fontSizes = [12, 13, 14, 15, 16, 17, 18, 20, 22, 24];

  const handleSettingChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2>Editor Settings</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="settings-tabs">
          <button 
            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button 
            className={`tab-button ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </button>
          <button 
            className={`tab-button ${activeTab === 'keyboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('keyboard')}
          >
            Keyboard
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="settings-section">
              <h3>General Settings</h3>
              
              <div className="setting-item">
                <label>Auto Save</label>
                <select 
                  value={settings.autoSave || 'off'}
                  onChange={(e) => handleSettingChange('autoSave', e.target.value)}
                >
                  <option value="off">Off</option>
                  <option value="afterDelay">After Delay</option>
                  <option value="onFocusChange">On Focus Change</option>
                </select>
              </div>

              <div className="setting-item">
                <label>Tab Size</label>
                <select 
                  value={settings.tabSize || 2}
                  onChange={(e) => handleSettingChange('tabSize', parseInt(e.target.value))}
                >
                  <option value={2}>2 Spaces</option>
                  <option value={4}>4 Spaces</option>
                  <option value={8}>8 Spaces</option>
                </select>
              </div>

              <div className="setting-item">
                <label>Word Wrap</label>
                <select 
                  value={settings.wordWrap || 'off'}
                  onChange={(e) => handleSettingChange('wordWrap', e.target.value)}
                >
                  <option value="off">Off</option>
                  <option value="on">On</option>
                  <option value="wordWrapColumn">Word Wrap Column</option>
                </select>
              </div>

              <div className="setting-item">
                <label>
                  <input 
                    type="checkbox"
                    checked={settings.showLineNumbers || true}
                    onChange={(e) => handleSettingChange('showLineNumbers', e.target.checked)}
                  />
                  Show Line Numbers
                </label>
              </div>

              <div className="setting-item">
                <label>
                  <input 
                    type="checkbox"
                    checked={settings.showCurrentLine || true}
                    onChange={(e) => handleSettingChange('showCurrentLine', e.target.checked)}
                  />
                  Highlight Current Line
                </label>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h3>Appearance</h3>
              
              <div className="setting-item">
                <label>Theme</label>
                <div className="theme-grid">
                  {themes.map(theme => (
                    <div 
                      key={theme.id}
                      className={`theme-option ${settings.theme === theme.id ? 'selected' : ''}`}
                      onClick={() => handleSettingChange('theme', theme.id)}
                    >
                      <div 
                        className="theme-preview" 
                        style={{ backgroundColor: theme.preview }}
                      />
                      <span>{theme.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="setting-item">
                <label>Font Size</label>
                <select 
                  value={settings.fontSize || 14}
                  onChange={(e) => handleSettingChange('fontSize', parseInt(e.target.value))}
                >
                  {fontSizes.map(size => (
                    <option key={size} value={size}>{size}px</option>
                  ))}
                </select>
              </div>

              <div className="setting-item">
                <label>Font Family</label>
                <select 
                  value={settings.fontFamily || 'Fira Code'}
                  onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                >
                  <option value="Fira Code">Fira Code</option>
                  <option value="JetBrains Mono">JetBrains Mono</option>
                  <option value="Source Code Pro">Source Code Pro</option>
                  <option value="Consolas">Consolas</option>
                  <option value="Monaco">Monaco</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'keyboard' && (
            <div className="settings-section">
              <h3>Keyboard Shortcuts</h3>
              
              <div className="shortcuts-list">
                <div className="shortcut-item">
                  <span className="shortcut-key">Ctrl+S</span>
                  <span className="shortcut-description">Save</span>
                </div>
                <div className="shortcut-item">
                  <span className="shortcut-key">Ctrl+Z</span>
                  <span className="shortcut-description">Undo</span>
                </div>
                <div className="shortcut-item">
                  <span className="shortcut-key">Ctrl+Y</span>
                  <span className="shortcut-description">Redo</span>
                </div>
                <div className="shortcut-item">
                  <span className="shortcut-key">Ctrl+A</span>
                  <span className="shortcut-description">Select All</span>
                </div>
                <div className="shortcut-item">
                  <span className="shortcut-key">Ctrl+D</span>
                  <span className="shortcut-description">Duplicate Line</span>
                </div>
                <div className="shortcut-item">
                  <span className="shortcut-key">Tab</span>
                  <span className="shortcut-description">Indent</span>
                </div>
                <div className="shortcut-item">
                  <span className="shortcut-key">Shift+Tab</span>
                  <span className="shortcut-description">Unindent</span>
                </div>
                <div className="shortcut-item">
                  <span className="shortcut-key">Ctrl+/</span>
                  <span className="shortcut-description">Toggle Comment</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="settings-footer">
          <button className="settings-button secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="settings-button primary" onClick={onClose}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorSettings; 