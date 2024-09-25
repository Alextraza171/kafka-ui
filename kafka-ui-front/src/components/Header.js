import React from 'react';
import './Header.css'; // Добавим стили для панели

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        {/* Добавь здесь свой логотип */}
        <img src="/images/logo.png" alt="Kafka UI Logo" />
      </div>
      <h1>Kafka UI</h1>
    </header>
  );
};

export default Header;