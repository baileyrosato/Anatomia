import React from "react";
import { useGLTF } from '@react-three/drei';
import { useCharacterCustomization } from "./CharacterCustomizationContext.jsx";

function PlaneModels () {
    // get planes of sectioning
    const { 
        midPlaneVisible,
        tranversePlaneVisible,
        paraSagPlaneVisible,
        frontalPlaneVisible,
    } = useCharacterCustomization();

    // load plane files
    const { scene: midPlane } = useGLTF('/model_files/mid_plane.gltf');
    const { scene: tranversePlane } = useGLTF('/model_files/tranverse_plane.gltf');
    const { scene: frontalPlane } = useGLTF('/model_files/frontal_plane.gltf');
    const { scene: paraPlane } = useGLTF('/model_files/para_plane.gltf');
 
    // render the planes into the scene
    return (
        <>
        {!midPlaneVisible && <primitive object={midPlane} position={[0, -1, 0]} />}
        {!tranversePlaneVisible && <primitive object={tranversePlane} position={[0, -1, 0]} />}
        {!paraSagPlaneVisible && <primitive object={paraPlane} position={[0, -1, 0]} />} 
        {!frontalPlaneVisible && <primitive object={frontalPlane} position={[0, -1, 0]} />}
        </>
    );
}
export default PlaneModels;