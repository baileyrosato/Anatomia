import { createContext, useContext, useState } from "react";

const CharacterCustomizationContext = createContext({});

// only one camera mode that is free zoom, rotate, pan for most pages
// other camera modes included for specific subunit interaction
export const CameraModes = {
  HEAD: "HEAD",
  POSTERIOR: "POSTERIOR",
  ANTERIOR: "ANTERIOR",
};

// preset colors for skin tone picker
export const SwatchesColors = [
  "#f3e7db",
  "#f7ead0",
  "#d8bba9",
  "#eadaba",
  "#d7bd96",
  "#d6aa8d",
  "#c78d75",
  "#a07e56",
  "#825c43",
  "#96634e",
  "#604134",
  "#664d48",
  "#643805",
  "#361e02",
];

export const CharacterCustomizationProvider = ({ children }) => {
  const [headConfiguratorOpen, setHeadConfiguratorOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState(CameraModes.HEAD);
  const [skinColor, setSkinColor] = useState(getRandomColor());
  const [bodySize, setBodySize] = useState(getRandomArbitrary(1, 5)); // Set an initial random body size from 1 - 5
  const [selectedGender, setGender] = useState(getRandomGender()); 

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * SwatchesColors.length);
    return SwatchesColors[randomIndex];
  }

  function getRandomGender() {
    const randomIndex = Math.random() < 0.5 ? 0 : 1; // 50% chance for each gender
    return randomIndex === 0 ? 'male' : 'female';
  }

  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  return (
    <CharacterCustomizationContext.Provider
      value={{
        headConfiguratorOpen,
        setHeadConfiguratorOpen,
        cameraMode,
        setCameraMode,
        skinColor,
        setSkinColor,
        bodySize,
        setBodySize,
        selectedGender,
        setGender,
      }}
    >
      {children}
    </CharacterCustomizationContext.Provider>
  );
};

export const useCharacterCustomization = () => {
  return useContext(CharacterCustomizationContext);
};

