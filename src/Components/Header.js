import React from 'react';
import './Header.css';
import logo from '../Images/logo.png';

const Header = ({ toggleSidebar, isAuthenticated }) => {
  return (
    <header className="header">
      <button className="menu-bar" onClick={toggleSidebar} disabled={!isAuthenticated}>
        ☰
      </button>
      <img src={logo} alt="Logo" className="header-logo" />
      <h1 className="header-title">Jeetri Electronics and Services</h1>
      <div className="header-info">
        <span className="header-email">myoffice.support@gmail.com</span>
        <span className="header-location">6201 Technology Drive, Suite 17, Frisco, TX, USA</span>
      </div>
    </header>
  );
};

export default Header;
