import { useState, useRef, useEffect } from 'react';

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="user-menu" ref={menuRef}>
      <button 
        className="user-avatar"
        onClick={() => setIsOpen(!isOpen)}
        title={user.name}
      >
        {getInitials(user.name)}
      </button>

      {isOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <div className="user-avatar-large">
              {getInitials(user.name)}
            </div>
            <div className="user-details">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
          
          <div className="menu-divider"></div>
          
          <div className="menu-items">
            <button className="menu-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z" fill="currentColor"/>
                <path d="M8 10C3.58172 10 0 13.5817 0 18H16C16 13.5817 12.4183 10 8 10Z" fill="currentColor"/>
              </svg>
              Profile Settings
            </button>
            
            <button className="menu-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L10.472 5.056L16 5.056L11.764 8.944L14.236 14L8 10.112L1.764 14L4.236 8.944L0 5.056L5.528 5.056L8 0Z" fill="currentColor"/>
              </svg>
              My Projects
            </button>
            
            <button className="menu-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C11.31 2 14 4.69 14 8C14 11.31 11.31 14 8 14Z" fill="currentColor"/>
                <path d="M8 4C7.45 4 7 4.45 7 5V8.59L9.71 11.29C10.1 11.68 10.73 11.68 11.12 11.29C11.51 10.9 11.51 10.27 11.12 9.88L9 7.76V5C9 4.45 8.55 4 8 4Z" fill="currentColor"/>
              </svg>
              Recent Activity
            </button>
          </div>
          
          <div className="menu-divider"></div>
          
          <button className="menu-item logout-item" onClick={onLogout}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H2V14H6V16H0V0H6V2Z" fill="currentColor"/>
              <path d="M10.586 4.586L9.172 6L11.172 8H4V10H11.172L9.172 12L10.586 13.414L15.414 8.707C15.789 8.332 15.789 7.668 15.414 7.293L10.586 4.586Z" fill="currentColor"/>
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;