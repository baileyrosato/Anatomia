// SubunitPage.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MantineProvider } from "@mantine/core";
import ModelPage from "./ModelRendering/ModelPage.js";
import { CharacterAnimationsProvider } from "./ModelRendering/CharacterAnimations.jsx";
import { CharacterCustomizationProvider } from "./ModelRendering/CharacterCustomizationContext.jsx";

import './SubunitPage.css';
import Menu from "./Navigation.js";

import { firebase } from './config.js';

export default function SubunitPage() {
  // get the unit and subunit parameters
  const { unit, subunit } = useParams();
  const [subunitDescription, setSubunitDescription] = useState("");

  useEffect(() => {
    setSubunitDescription("");
    // fetch courseData from database
    const courseDataRef = firebase.database().ref('courseData');
    courseDataRef.once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          // find the index of the unit
          const foundUnitIndex = data.findIndex((course) => course.unit === unit);
        
          // find the index of the subunit within the unit
          const foundSubunitIndex = data[foundUnitIndex]?.subunits.findIndex((sub) => sub.title === subunit);

          // fetch subunit description from database using the indices
          if (foundUnitIndex !== -1 && foundSubunitIndex !== -1) {
            const subunitRef = firebase.database().ref(`courseData/${foundUnitIndex}/subunits/${foundSubunitIndex}/description`);
            subunitRef.once('value')
              .then((snapshot) => {
                const description = snapshot.val();
                if (description) {
                  setSubunitDescription(description); 
                }
              })
              .catch((error) => {
                console.error('Error fetching subunit description from the database:', error);
              });
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching course data from the database:', error);
      });
  }, [unit, subunit]); // fetch description whenever unit or subunit changes

  
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
          <Menu />
        </div>

        {/*Unit Titles*/}
        <div className="unit-container">
          <div className="unit-titles-container">
            <h2>{unit}</h2>
            <h3>{subunit}</h3>
          </div>
        </div>

        {/*Model Container*/}
          <CharacterAnimationsProvider>
            <div className="model-container">
              <ModelPage />
            </div>
          </CharacterAnimationsProvider>

         {/* Embedded container with scrollbar */}
         <div className="unit-content-container">
            <div className="unit-content">
              {subunitDescription}
            </div>
          </div>
      </div>

    </MantineProvider>
    </CharacterCustomizationProvider>
  );
}
