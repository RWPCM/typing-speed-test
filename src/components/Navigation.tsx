import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <Link 
        to="/" 
        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
      >
        Typing Test
      </Link>
      <Link 
        to="/history" 
        className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
      >
        WPM History
      </Link>
    </nav>
  );
};

export default Navigation;
