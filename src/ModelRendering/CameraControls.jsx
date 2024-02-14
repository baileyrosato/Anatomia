import { OrbitControls } from "@react-three/drei";
import { useCharacterCustomization } from "./CharacterCustomizationContext.jsx";

import { useRef } from "react";

export const CameraControls = () => {
  const {setHeadConfiguratorOpen} = useCharacterCustomization();
  const orbitControls = useRef();

  const handleReset = () => {
    if (orbitControls.current) {
      orbitControls.current.reset(); 
    }
  };

  // model camera controls
  // TODO: set min and max zoom
  return (
    <>
       <OrbitControls
        ref={orbitControls}
        enableRotate={true} // Allow rotation
        enableZoom={true} // Allow zooming
        enablePan={true} // Allow panning
        onStart={() => {
          setHeadConfiguratorOpen(false); // Close HeadConfigurator when starting to interact with controls
        }}
      />
    </>
  );
};