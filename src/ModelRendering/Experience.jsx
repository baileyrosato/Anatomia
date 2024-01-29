import { CameraControls } from "./CameraControls.jsx";
import Anatomymodel from "./Anatomymodel.jsx";

const Experience = () => {
  return (
    <>
      <CameraControls />
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
      <mesh
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[0, -1, 0]}
        receiveShadow
      >
      </mesh>
    </>
  );
};

export default Experience;