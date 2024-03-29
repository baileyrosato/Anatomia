import { CameraControls } from "./CameraControls.jsx";
import Anatomymodel from "./Anatomymodel.jsx";
import PlaneModels from "./PlaneModels.jsx";

const Experience = ({ orbitControlsRef }) => {
  return (
    <>
      <CameraControls orbitControlsRef={orbitControlsRef}/>
      <ambientLight />
      <directionalLight
        position={[5, 10, 7]}
      />
      <directionalLight
        position={[-5,-10,-7]}
      />
      <group position={[0, -1, 0]}>
        <Anatomymodel />
      </group>
      <PlaneModels />
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, -1, 0]}
      >
      </mesh>
    </>
  );
};

export default Experience;