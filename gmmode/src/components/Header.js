import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHockeyPuck, faUsers, faClipboard } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <FontAwesomeIcon icon={faHockeyPuck} className="header-icon" />
        <h1>NHL 25 GM Mode</h1>
      </div>
      <nav className="header-nav">
        <Link to="/" className="nav-link">
          <FontAwesomeIcon icon={faUsers} className="nav-icon" />
          <span>Roster</span>
        </Link>
        <Link to="/lineup" className="nav-link">
          <FontAwesomeIcon icon={faClipboard} className="nav-icon" />
          <span>Lineups</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;