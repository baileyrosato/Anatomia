// ThreeDModel.js

import React, { useEffect } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

export default function ThreeDModel({ unit, subunit, selectedColor }) {  
  useEffect(() => {

    // TODO: need to fetch the 3d model from database based on the unit and subunit
    // for now, we are just displaying a cube

    // set up Three.js scene 
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();

     // set renderer size and append it to the DOM
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    document.getElementById('root').appendChild(renderer.domElement);

    // create a cube
    const geometry = new THREE.BoxGeometry();
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
    controls.target.set(0, 0, 0);
    controls.update();

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

    const animate = () => {
      requestAnimationFrame(animate);
      renderScene();
    };

    animate();
     
    // handle window resize: TODO: not working
    window.addEventListener('resize', renderScene);

    // clean up on component unmount
    return () => {
      document.getElementById('root').removeChild(renderer.domElement);
      window.removeEventListener('resize', renderScene);
    };
  }, [selectedColor]); // empty dependency array means this effect runs once on mount, will need to update to run when subunit and unit change

  return <div>{}</div>;
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