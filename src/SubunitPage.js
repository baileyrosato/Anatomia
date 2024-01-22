// SubunitPage.js

// import react
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

// import other pages
import './SubunitPage.css';
import Menu from "./Navigation.js"
import ThreeDModel from './ThreeDModel.js';

export default function SubunitPage() 
{
  // get the unit and subunit parameters
  const { unit, subunit } = useParams();
  const [selectedColor, setSelectedColor] = useState(0.5);
  const [width, setWidth] = useState(1);
  const [currentShape, setCurrentShape] = useState('cube');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };
 
  const handleWidthChange = (value) => {
    setWidth(value); 
  };

  return (
    <div className="subunit-page">
      {/* Hamburger menu */}
      <div className="HamburgerMenu">
        <Menu />
      </div>
      <div className="cube-container">
        <div className="titles-container">
          <h2>{unit}</h2>
          <h3>{subunit}</h3>
        </div>
        <div className='threeD-model'>
          <ThreeDModel
          unit={unit}
          subunit={subunit}
          selectedColor={selectedColor}
          width={width}
          shape={currentShape}
          onColorChange={handleColorChange}
        /></div>
        <div className="controls-container">
        <div className="toggle-switch">
          <label>
            <p  style={{ position:'absolute', top: -50, right: 10}}> Biological</p>
            <p  style={{ position:'absolute', top: -50, left: 55}}> Sex</p>
            <span className="label" style={{position:'absolute', bottom: 10, right: 70}}>Male</span>

            <input
              type="checkbox"
              checked={currentShape === 'sphere'}
              onChange={() => setCurrentShape(currentShape === 'cube' ? 'sphere' : 'cube')}
            />
            <span className="slider"></span>
            <span className="label" style={{position:'absolute', bottom: 10, right: -60}}>Female</span>

          </label>
          </div>
        <div className="control-group">
            <label htmlFor="width-slider">Body Size:</label>
            <input
              id="width-slider"
              type="range"
              min="1"
              max="5"
              step="0.1"
              value={width}
              onChange={(e) => handleWidthChange(parseFloat(e.target.value))}
            />
          </div>
          <div className="control-group">
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
          </div>
          {/*TODO: render content dynamically*/}
          <div className="content-container">
            <p> Content: </p> <br></br>
            <p> The side of a 3D shape is the face.</p> <br></br>
            <p> The edges of a 3D shape are where the faces meet</p>
          </div>
          <div className="help-icon" onMouseOver={() => setShowTooltip(true)} onMouseOut={() => setShowTooltip(false)}>
          ?
        </div>
        {showTooltip && (
          <div className="tooltip">
          <p>Controls:</p>
          <p>- Rotate: Left Click + Drag</p>
          <p>- Zoom: Scroll</p>
          <p>- Pan: Right Click + Drag</p>
        </div>
        )}
      </div>
    </div>
  </div>
  );
}
