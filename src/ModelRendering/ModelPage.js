import React, { useRef} from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";
import { useGLTF } from '@react-three/drei';
import { useCharacterCustomization } from "./CharacterCustomizationContext.jsx";

function ModelPage({ subunit }) {
  const orbitControlsRef = useRef();

  // get planes of sectioning
  const { 
    midPlaneVisible,
    tranversePlaneVisible,
    paraSagPlaneVisible,
    frontalPlaneVisible,
  } = useCharacterCustomization();

   // loading plane files
   const { scene: midPlane } = useGLTF('/model_files/mid_plane.gltf');
   const { scene: tranversePlane } = useGLTF('/model_files/tranverse_plane.gltf');
   const { scene: frontalPlane } = useGLTF('/model_files/frontal_plane.gltf');
   const { scene: paraPlane } = useGLTF('/model_files/para_plane.gltf');

  return (
    <>
      <div>
        <div className="model-page-container">
        <Canvas
          camera={{ position: [1, 1, 3], fov: 35 }}
          shadows
          gl={{ preserveDrawingBuffer: true }}
        >
        <Experience orbitControlsRef={orbitControlsRef} />
        {/* render the planes into the scene */}
        {!midPlaneVisible && <primitive object={midPlane} position={[0, -1, 0]} />}
        {!tranversePlaneVisible && <primitive object={tranversePlane} position={[0, -1, 0]} />}
        {!paraSagPlaneVisible && <primitive object={paraPlane} position={[0, -1, 0]} />} 
        {!frontalPlaneVisible && <primitive object={frontalPlane} position={[0, -1, 0]} />}

        </Canvas>
        </div>
        <Interface orbitControlsRef={orbitControlsRef} subunit={subunit} />
      </div>
    </>
  );
}
export default ModelPage;
