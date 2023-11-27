// SubunitPage.js

// import react
import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

// import other pages
import './SubunitPage.css';
import ThreeDModel from './ThreeDModel.js';

export default function SubunitPage() 
{
  // get the unit and subunit parameters
  const { unit, subunit } = useParams();
  const [selectedColor, setSelectedColor] = useState(0.5);
  const [width, setWidth] = useState(1);
  const [currentShape, setCurrentShape] = useState('cube');

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  const handleWidthChange = (value) => {
    setWidth(value);
  };
  
  return (
    <div className="subunit-page">
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
        /></div>
        
        <div className="controls-container">
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
          <div className="control-group">
            <label htmlFor="width-slider">Width:</label>
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
          <div className="toggle-switch">
          <label>
            <span className="label">Cube</span>
            <input
              type="checkbox"
              checked={currentShape === 'sphere'}
              onChange={() => setCurrentShape(currentShape === 'cube' ? 'sphere' : 'cube')}
            />
            <span className="slider"></span>
            <span className="label">Sphere</span>
          </label>
        </div>
      </div>
    </div>
  </div>
  );
}