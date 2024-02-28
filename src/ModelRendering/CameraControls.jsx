import { OrbitControls } from "@react-three/drei";
import { useCharacterCustomization, CameraModes } from "./CharacterCustomizationContext.jsx";
import { useEffect } from "react";

export const CameraControls = ({ orbitControlsRef }) => {
  const {setHeadConfiguratorOpen} = useCharacterCustomization();
  const { cameraMode } = useCharacterCustomization();

  useEffect(() => {
    // update camera position based on camera mode
    if (orbitControlsRef.current) {
      const controls = orbitControlsRef.current;
      switch (cameraMode) {
        case CameraModes.HEAD:
          // set camera position for HEAD mode (this is starting default)
          controls.object.position.set(1, 1, 3);
          controls.enableRotate = true;
          break;
        case CameraModes.POSTERIOR:
          // set camera position for POSTERIOR mode
          controls.object.position.set(0, 0, -3);
           controls.enableRotate = false;
          break;
        case CameraModes.ANTERIOR:
          // set camera position for ANTERIOR mode
          controls.object.position.set(0, 0, 3);
           controls.enableRotate = false;
          break;
        default:
          // set default camera position
          controls.object.position.set(1, 1, 3);
          controls.enableRotate = true;
      }
    }
  }, [cameraMode, orbitControlsRef]);

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