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
        <div className="cube-container">
          <div className="titles-container">
            <h2>{unit}</h2>
            <h3>{subunit}</h3>
          </div>
        </div>
        <CharacterCustomizationProvider>
          <CharacterAnimationsProvider>
            <div className="model-container">
              <ModelPage />
            </div>
          </CharacterAnimationsProvider>
        </CharacterCustomizationProvider>
      </div>
    </MantineProvider>
  );
}
