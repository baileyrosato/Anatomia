import { createContext, useContext, useState } from "react";

const CharacterCustomizationContext = createContext({});

// only one camera mode that is free zoom, rotate, pan
export const CameraModes = {
  HEAD: "HEAD",
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
  const [skinColor, setSkinColor] = useState("#ffffff");
  const [morphTargetDictionary, setMorphTargetDictionary] = useState([]);
  const [morphTargetInfluences, setMorphTargetInfluences] = useState([]);
  const [bodySize, setBodySize] = useState(1); // Set an initial body size
  const [selectedGender, setGender] = useState("male"); 
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
