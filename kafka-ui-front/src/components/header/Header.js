import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Kafka UI Logo" />
        </Link>
      </div>
      <h1>Kafka UI</h1>
    </header>
  );
};

export default Header;