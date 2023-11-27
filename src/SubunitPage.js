// SubunitPage.js

// import react
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

// import other pages
import './SubunitPage.css';
import ThreeDModel from './ThreeDModel';
import Menu from "./Navigation"

export default function SubunitPage() 
{
  // get the unit and subunit parameters
  const { unit, subunit } = useParams();
  const [selectedColor, setSelectedColor] = useState(0.5);

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  // TODO: fetch and display the actual data for the selected subunit
  // For now, simply display the unit and subunit names
  return (
    <div className="subunit-page">
      {/* Hamburger menu */}
      <div className="HamburgerMenu">
        <Menu />
      </div>
      <div className="cube-container">
        <h2>{unit}</h2>
        <h3>{subunit}</h3>
        <ThreeDModel unit={unit} subunit={subunit} selectedColor={selectedColor} />
        <label htmlFor="color-slider">Skin Tone:</label>
        <input
          id="color-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={selectedColor}
          onChange={(e) => handleColorChange(parseFloat(e.target.value))}
        />
        {/* TODO: display actual subunit data here 
            this includes 3D model, course content, etc. retrieved from the database 
            and dynamically displayed */}
      </div>
    </div>
  );
}
