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
          <a href="/course/Unit 1: Organs, Systems, and the Organization of the Body/Directional Terms">Unit 1: Directional Terms</a>
          <a href="/course/Unit 1: Organs, Systems, and the Organization of the Body/Subunit 1.2">Unit 1: Subunit 1.2</a>
          <a href="/course/Unit 1: Organs, Systems, and the Organization of the Body/Subunit 1.3">Unit 1: Subunit 1.3</a>
          <a href="/course/Unit 2: Coming Soon.../Subunit 2.1">Unit 2: Subunit 2.1</a>
          <a href="/course/Unit 2: Coming Soon.../Subunit 2.2">Unit 2: Subunit 2.2</a>
          <a href="/course/Unit 2: Coming Soon.../Subunit 2.3">Unit 2: Subunit 2.3</a>
          <a href="/course/Unit 3: Coming Soon.../Subunit 3.1">Unit 3: Subunit 3.1</a>
          <a href="/course/Unit 3: Coming Soon.../Subunit 3.2">Unit 3: Subunit 3.2</a>
          <a href="/course/Unit 3: Coming Soon.../Subunit 3.3">Unit 3: Subunit 3.3</a>
          <a href="/user-guide">User Guide</a>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
