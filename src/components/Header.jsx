import UserMenu from './UserMenu';

const Header = ({ onRun, isLoading, selectedLanguage, user, onAuthClick, onLogout, onSettingsClick, onFileManagerClick, onSnippetsClick, onFormatterClick, onUploadClick, onStorageClick }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">
            <span className="title-icon">⚡</span>
            CodeRunner
          </h1>
          <span className="app-subtitle">Online Code Compiler</span>
        </div>

        <nav className="header-nav">
          <a href="#" className="nav-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L10.472 5.056L16 5.056L11.764 8.944L14.236 14L8 10.112L1.764 14L4.236 8.944L0 5.056L5.528 5.056L8 0Z" fill="currentColor"/>
            </svg>
            Examples
          </a>
          <a href="#" className="nav-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z" fill="currentColor"/>
              <path d="M4 6H12V8H4V6Z" fill="white"/>
              <path d="M4 10H8V12H4V10Z" fill="white"/>
            </svg>
            Docs
          </a>
          <a href="#" className="nav-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" fill="currentColor"/>
            </svg>
            GitHub
          </a>
        </nav>
        <div className="header-right">
          <button className="header-action-button" onClick={onFileManagerClick} title="File Manager">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2C2 1.44772 2.44772 1 3 1H6L8 3H13C13.5523 3 14 3.44772 14 4V14C14 14.5523 13.5523 15 13 15H3C2.44772 15 2 14.5523 2 14V2Z" fill="currentColor"/>
            </svg>
          </button>
          
          <button className="header-action-button" onClick={onSnippetsClick} title="Code Snippets">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z" fill="currentColor"/>
            </svg>
          </button>
          
          <button className="header-action-button" onClick={onFormatterClick} title="Format Code">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z" fill="currentColor"/>
            </svg>
          </button>
          
          <button className="header-action-button" onClick={onUploadClick} title="Upload File">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L10.472 5.056L16 5.056L11.764 8.944L14.236 14L8 10.112L1.764 14L4.236 8.944L0 5.056L5.528 5.056L8 0Z" fill="currentColor"/>
            </svg>
          </button>
          
          <button className="header-action-button" onClick={onStorageClick} title="Storage Manager">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2C2 1.44772 2.44772 1 3 1H6L8 3H13C13.5523 3 14 3.44772 14 4V14C14 14.5523 13.5523 15 13 15H3C2.44772 15 2 14.5523 2 14V2Z" fill="currentColor"/>
              <path d="M4 6H12V8H4V6Z" fill="white"/>
              <path d="M4 10H8V12H4V10Z" fill="white"/>
            </svg>
          </button>
          
          <button className="header-action-button" onClick={onSettingsClick} title="Settings">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" fill="currentColor"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" fill="currentColor"/>
            </svg>
          </button>
          
          {user ? (
            <>
              <UserMenu user={user} onLogout={onLogout} />
            </>
          ) : (
            <button className="auth-button" onClick={onAuthClick}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
                <path d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z" fill="currentColor"/>
              </svg>
              Sign In
            </button>
          )}
          
          <button 
            className={`run-button ${isLoading ? 'loading' : ''}`}
            onClick={onRun}
            disabled={isLoading || !selectedLanguage}
          >
            {isLoading ? (
              <>
                <div className="button-spinner"></div>
                Running...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path 
                    d="M3 2L13 8L3 14V2Z" 
                    fill="currentColor"
                  />
                </svg>
                Run Code
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;