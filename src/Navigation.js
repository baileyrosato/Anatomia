// Navigation.js

// import react
import React, {useState} from 'react';
import './Navigation.css';

const HamburgerMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="hamburger-menu">
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {isMenuOpen && (
        <div className="menu-items">
          <a href="/MainMenu">Main Menu</a>
          <a href="https://ceias.nau.edu/capstone/projects/CS/2024/Anatomia_F23/">About</a>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
