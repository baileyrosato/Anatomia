// ThreeDModel.js

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

export default function ThreeDModel({ unit, subunit, selectedColor, width, shape }) {  

  const canvasRef = useRef(null);

  useEffect(() => {

    const container = document.querySelector('.threeD-model');
    // TODO: need to fetch the 3d model from database based on the unit and subunit
    // for now, we are just displaying a cube

    // set up Three.js scene 
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();

     // set renderer size and append it to the DOM
     renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
     container.appendChild(renderer.domElement);

    let geometry;

    if (shape === 'cube') {
      geometry = new THREE.BoxGeometry(width, 1, 1);
    } else if (shape === 'sphere') {
      geometry = new THREE.SphereGeometry(width / 2, 32, 32);
    }

    const color1 = new THREE.Color('#ff0000');
    const color2 = new THREE.Color('#0000ff');
    const dynamicColor = color1.clone().lerp(color2, selectedColor);
    const material = new THREE.MeshBasicMaterial({ color: dynamicColor.getHex()});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // position the camera
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

     // initialize orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.update();
    
    let renderRequested = false;

    // render the scene
    const renderScene = () => {
      if (resizeRendererToDisplaySize(renderer)) 
      {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      controls.update();
      renderer.render(scene, camera);
    };

    function requestRenderIfNotRequested() {
      if (!renderRequested) {
        renderRequested = true;
        requestAnimationFrame(() => {
          renderRequested = false;
          renderScene();
        });
      }
    }

    const canvas = renderer.domElement;
    canvasRef.current = canvas;

    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested);

        
    renderScene();

    // clean up on component unmount
    return () => {
      container.removeChild(renderer.domElement);
      window.removeEventListener('resize', renderScene);
    };
  }, [width, selectedColor, shape]); // will need to update to run when variables change

  return(
    <div>
    <canvas ref={canvasRef} style={{ display: 'none' }} />
    {/* ... (existing code) */}
  </div>
  ) 
}

// function to resize render based on screen size
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) 
  {
    renderer.setSize(width, height, false);
  }
  return needResize;
}