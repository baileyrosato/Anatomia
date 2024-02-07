// SubunitPage.js

import { useParams } from 'react-router-dom';
import { MantineProvider } from "@mantine/core";
import ModelPage from "./ModelRendering/ModelPage.js";
import { CharacterAnimationsProvider } from "./ModelRendering/CharacterAnimations.jsx";
import { CharacterCustomizationProvider } from "./ModelRendering/CharacterCustomizationContext.jsx";

import './SubunitPage.css';
import Menu from "./Navigation.js";

export default function SubunitPage() {
  // get the unit and subunit parameters
  const { unit, subunit } = useParams();

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
              {/* Add your unit content here */}
              In clinical settings, it is important to have a standard frame of reference. 
              Anatomical position refers to the starting point and is a reference point that ensures everyone is speaking about the same side or part of the body. 
              Anatomical position is always in reference to the patient. In anatomical position, the patient's body is upright, facing forward, arms straight 
              and down at the patient's side with palms facing forward, legs straight, feet flat on the ground, and eyes open. <br/><br/>
              Thinking Question: Do you think the model shown is in anatomical position? Why or why not?
            </div>
          </div>
      </div>

    </MantineProvider>
    </CharacterCustomizationProvider>
  );
}
