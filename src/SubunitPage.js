// SubunitPage.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MantineProvider } from "@mantine/core";
import ModelPage from "./ModelRendering/ModelPage.js";
import { CharacterCustomizationProvider } from "./ModelRendering/CharacterCustomizationContext.jsx";
import Whiteboard from './ModelRendering/Whiteboard.js';


import './SubunitPage.css';
import HamburgerMenu from "./Navigation.js";

import { fetchSubunitData, fetchSubunitImageDownloadUrl } from './Database/databaseUtils.js';

export default function SubunitPage() {
  // get the unit and subunit parameters
  const { unit, subunit } = useParams();
  const [subunitDescription, setSubunitDescription] = useState("");
  const [subunitImage, setSubunitImage] = useState("");
  const [showFullImage, setShowFullImage] = useState(false);


  useEffect(() => {
    setSubunitDescription("");
    setSubunitImage("");
    fetchSubunitData(unit, subunit)
    .then((subunitData) => {
      setSubunitDescription(subunitData.description); 
      if (subunitData.image) {
        fetchSubunitImageDownloadUrl(subunitData.image)
          .then((url) => {
            setSubunitImage(url);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
          });
      }
    })
    .catch((error) => {
      console.error('Error fetching subunit data:', error);
    });
}, [unit, subunit]); // fetch description and image if the unit and subunit changes

const handleImageClick = () => {
  setShowFullImage(true);
};

const handleCloseFullImage = () => {
  setShowFullImage(false);
};  

  return (
  <CharacterCustomizationProvider>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: (_theme) => ({
          body: {
            width: "100vw",
            height: "100vh",
          },
          "#root": {
            width: "100%",
            height: "100%",
          },
        }),
      }} 
    >
     <div className="subunit-page">
        
        {/* Hamburger menu */}
        <div className="HamburgerMenu">
          <HamburgerMenu />
        </div>

        {/*Unit Titles*/}
        <div className="unit-container">
          <div className="unit-titles-container">
            <h2>{unit}</h2>
            <h3>{subunit}</h3>
          </div>
        </div>
        {/* Model and Whiteboard Container */}
        <div className="model-and-whiteboard-container">
          {/* Model Container */}
          <div className="model-container">
            <ModelPage subunit={subunit}/>
          </div>
          {/* Whiteboard Container */}
          <div className="whiteboard-container">
            <Whiteboard />
          </div>
        </div>

         {/* Embedded container with scrollbar that displays the subunit description and image */}
         <div className="unit-content-container">
            <div className="unit-content">
              {subunitDescription}
              {subunitImage && 
                <img 
                  src={subunitImage} 
                  alt="Subunit" 
                  className="subunit-image" 
                  onClick={handleImageClick} 
                />
              }
            </div>
          </div>
          {/* show the full image on top of page */}
          {showFullImage && (
            <div className="full-image-overlay" onClick={handleCloseFullImage}>
              <div className="full-image-container">
                <img src={subunitImage} alt="Subunit" className="full-image" />
              </div>
            </div>
          )}
      </div>
    </MantineProvider>
    </CharacterCustomizationProvider>
  );
}
