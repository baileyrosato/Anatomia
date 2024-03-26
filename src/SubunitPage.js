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
  const [subunitImages, setSubunitImages] = useState([]);
  const [showFullImage, setShowFullImage] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);


  useEffect(() => {
    setSubunitDescription("");
    setSubunitImages([]);
    fetchSubunitData(unit, subunit)
    .then((subunitData) => {
      setSubunitDescription(subunitData.description); 
      if (subunitData.images && Array.isArray(subunitData.images)) {
        const imagePromises = subunitData.images.map(image =>
          fetchSubunitImageDownloadUrl(image)
            .then(url => url)
            .catch(error => {
              console.error('Error getting download URL:', error);
              return null;
            })
        );
        Promise.all(imagePromises)
          .then(imageUrls => {
            setSubunitImages(imageUrls.filter(url => url !== null));
          });
      }
    })
    .catch((error) => {
      console.error('Error fetching subunit data:', error);
    });
  }, [unit, subunit]); // fetch description and image if the unit and subunit changes

const handleImageClick = (index) => {
  setSelectedImageIndex(index);
  setShowFullImage(true);
};

const handleCloseFullImage = () => {
  setSelectedImageIndex(null);
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

         {/* Embedded container with scrollbar that displays the subunit description and images */}
         <div className="unit-content-container">
            <div className="unit-content">
              {subunitDescription}
              {subunitImages.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`Subunit ${index}`} 
                  className="subunit-image" 
                  onClick={() => handleImageClick(index)} 
                />
              ))}
            </div>
          </div>
          {/* show the selected image on top of page */}
          {showFullImage && (
            <div className="full-image-overlay" onClick={handleCloseFullImage}>
              <div className="full-image-container">
                <img src={subunitImages[selectedImageIndex]} alt={`Subunit ${selectedImageIndex}`} className="full-image" />
              </div>
            </div>
          )}
      </div>
    </MantineProvider>
    </CharacterCustomizationProvider>
  );
}
