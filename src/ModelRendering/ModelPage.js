import React, { useRef} from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";

function ModelPage({ subunit }) {
  const orbitControlsRef = useRef();
  return (
    <>
      <div>
        <div className="model-page-container">
        <Canvas
          camera={{ position: [1, 1, 3], fov: 35 }}
          shadows
          gl={{ preserveDrawingBuffer: true }}
          data-testid="canvas" 
        >
        <Experience orbitControlsRef={orbitControlsRef} />
        </Canvas>
        </div>
        <Interface orbitControlsRef={orbitControlsRef} subunit={subunit} />
      </div>
    </>
  );
}
export default ModelPage;
