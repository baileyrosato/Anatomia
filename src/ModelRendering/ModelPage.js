import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Interface from "./Interface.jsx";
import { useGLTF } from '@react-three/drei';
import { Button } from '@mui/material';

function ModelPage() {
  const orbitControlsRef = useRef();

    // setting visibility variables for plane sections
    const [ midPlaneVisible, setMidPlaneVisible ] = useState(true);
    const [ tranversePlaneVisible, setTranversePlaneVisible ] = useState(true);
    const [ paraSagPlaneVisible, setParaPlaneVisible ] = useState(true);
    const [ frontalPlaneVisible, setFrontalPlaneVisible ] = useState(true);
  
    // setting visibility variables for Plane Buttons
    const [ buttonsVisible, setButtonsVisible ] = useState(false);
  
    // handles the Plane button to display the buttons
    const handlePlaneButton = () => {
      setButtonsVisible(!buttonsVisible);
    };
   
    // loading plane files
    const { scene: midPlane } = useGLTF('/model_files/mid_plane.gltf');
    const { scene: tranversePlane } = useGLTF('/model_files/tranverse_plane.gltf');
    const { scene: frontalPlane } = useGLTF('/model_files/frontal_plane.gltf');
    const { scene: paraPlane } = useGLTF('/model_files/para_plane.gltf');  
  

    return (
      <>
        <Button style={{ float: 'right'}}className="PlanesButton" onClick={handlePlaneButton}>Planes</Button>

          {buttonsVisible && (
            <>
              <Button style={{ float: 'right', color: '#1E88E5' }} onClick={() => setMidPlaneVisible(!midPlaneVisible)}> MidSagittal </Button>
              <Button style={{ float: 'right', color: '#004D40' }} onClick={() => setTranversePlaneVisible(!tranversePlaneVisible)}> Tranverse </Button>
              <Button style={{ float: 'right', color: "#FFC107" }} onClick={() => setParaPlaneVisible(!paraSagPlaneVisible)}> ParaSagittal </Button>
              <Button style={{ float: 'right', color: "#D81B60" }} onClick={() => setFrontalPlaneVisible(!frontalPlaneVisible)}> Frontal </Button>
            </>
          )}

        <Canvas
          camera={{ position: [1, 1, 3], fov: 35 }}
          shadows
          gl={{ preserveDrawingBuffer: true }}
        >
          <Experience orbitControlsRef={orbitControlsRef} />
        
          {!midPlaneVisible && <primitive object={midPlane} position={[0, -1, 0]} />}
          {!tranversePlaneVisible && <primitive object={tranversePlane} position={[0, -1, 0]} />}
          {!paraSagPlaneVisible && <primitive object={paraPlane} position={[0, -1, 0]} />} 
          {!frontalPlaneVisible && <primitive object={frontalPlane} position={[0, -1, 0]} />}



        </Canvas>
        <Interface orbitControlsRef={orbitControlsRef}  />
        </>
    );
}

export default ModelPage;
