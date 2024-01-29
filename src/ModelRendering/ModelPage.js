import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";

function ModelPage() {
    return (
      <>
        <Canvas
          camera={{ position: [1, 1.5, 2.5], fov: 50 }}
          shadows
          gl={{ preserveDrawingBuffer: true }}
        >
          <Experience />
        </Canvas>
        <Interface />
      </>
    );
}

export default ModelPage;
