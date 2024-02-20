import { OrbitControls } from "@react-three/drei";
import { useCharacterCustomization } from "./CharacterCustomizationContext.jsx";

export const CameraControls = ({ orbitControlsRef }) => {
  const {setHeadConfiguratorOpen} = useCharacterCustomization();

  // model camera controls
  // TODO: set min and max zoom
  return (
    <>
       <OrbitControls
        ref={orbitControlsRef}
        enableRotate={true} // Allow rotation
        enableZoom={true} // Allow zooming
        enablePan={true} // Allow panning
        onStart={() => {
          setHeadConfiguratorOpen(false); // close settings configurator when starting to interact with controls
        }}
      />
    </>
  );
};