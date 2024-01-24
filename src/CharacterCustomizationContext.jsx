import { createContext, useContext, useState } from "react";

const CharacterCustomizationContext = createContext({});

export const CameraModes = {
  HEAD: "HEAD",
};

// colors for skin tone picker
export const SwatchesColors = [
  "#D8bba9",
  "#d6aa8d",
  "#c78d75",
  "#96634e",
  "#664d48",
  "#3a3d36",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057", 
  "#643805",
  "#361e02",
  "#2e1a02",
];

export const CharacterCustomizationProvider = ({ children }) => {
  
  const [headConfiguratorOpen, setHeadConfiguratorOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState(CameraModes.HEAD);
  const [skinColor, setSkinColor] = useState("#cdcdcd");
  const [morphTargetDictionary, setMorphTargetDictionary] = useState([]);
  const [morphTargetInfluences, setMorphTargetInfluences] = useState([]);
  const [bodySize, setBodySize] = useState(50); // Set an initial body size

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
        morphTargetDictionary,
        setMorphTargetDictionary,
        morphTargetInfluences,
        setMorphTargetInfluences,
      }}
    >
      {children}
    </CharacterCustomizationContext.Provider>
  );
};

export const useCharacterCustomization = () => {
  return useContext(CharacterCustomizationContext);
};
