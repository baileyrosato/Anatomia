// ThreeDModel.js

// import react
import React, { useEffect, useRef } from 'react';
// import three.js
import * as THREE from 'three';
// import controls
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
// import .gltf loader to display custom 3d file
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function ThreeDModel({ unit, subunit, selectedColor, width, shape }) {  

  const canvasRef = useRef(null);

  useEffect(() => {

    const container = document.querySelector('.threeD-model');
    // TODO: need to fetch the 3d model from database based on the unit and subunit
    // for now, we are just displaying a cube

    // set up Three.js scene 
    const scene = new THREE.Scene();

    // add light to scene
    const light = new THREE.DirectionalLight(0xffffff, 1);
    const hemlight = new THREE.HemisphereLight(0xffffff, 1);
    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5,10,7);
    hemlight.position.set(0,10,0);
    hemlight.groundColor = new THREE.Color(0xffaa00)
    backLight.position.set(-5,-10,-7);
    scene.add(light);
    scene.add(hemlight);
    scene.add(backLight);

    // position the camera
    const fov = 30;
    const aspect = window.innerWidth/window.innerHeight;
    const near = 1;
    const far = 50;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // create web renderer
    const renderer = new THREE.WebGLRenderer();

    // set background color
    scene.background = new THREE.Color('lightgrey');

    // set renderer size and append it to the DOM
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    container.appendChild(renderer.domElement);

    // TODO: set min and max zoom/pan 
    // initialize orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 10, 10);
    controls.minDistance = 1.5;
    controls.maxDistance = 15;

    // position the camera
    camera.position.set(0, 10, 12);
    controls.update();
  
    let Mesh;

    // initialize loader
    let loader = new GLTFLoader();

    // load in custom file (located in public file)
    loader.load('/anatomymodel.gltf', (gltf) => {
      Mesh = gltf.scene;
      Mesh.scale.set(0.5,0.5,0.5);

      // set model position
      Mesh.position.x = 0;
      Mesh.position.y = 9.5;
      Mesh.position.z = 10;

      // set the target point for camera rotation
      controls.target.set(0, 10, 10);

      // iterate over all materials and set metallic to 0
      Mesh.traverse((child) => {
        if (child.isMesh) {
          // assuming the material is MeshStandardMaterial
          if (child.material.isMeshStandardMaterial) {
            // set metalness to 0 so we can see model skin ton
            child.material.metalness = 0;
            // set a start and end color
            const startColor = new THREE.Color("#ffdbac");
            const endColor = new THREE.Color("#8d5524");
          
            // interpolate colors
            const interpolatedColor = startColor.clone().lerp(endColor, selectedColor);
          
            // set the interpolated color to the material
            child.material.color.copy(interpolatedColor);

            child.material.needsUpdate = true;
          }
        }
      });
      scene.add(Mesh);
    });

    // REMOVED: THIS IS FOR CUBE
    // // create 3D shape
    // let geometry;
    // if (shape === 'cube') {
    //   geometry = new THREE.BoxGeometry(width, 1, 1);
    // } else if (shape === 'sphere') {
    //   geometry = new THREE.SphereGeometry(width / 2, 32, 32);
    // }
   
    // // set color 
    // const color1 = new THREE.Color('#ffdbac');
    // const color2 = new THREE.Color('#8d5524');
    // const dynamicColor = color1.clone().lerp(color2, selectedColor);
    // const material = new THREE.MeshBasicMaterial({ color: dynamicColor.getHex()});

    // // create shape and add to scene
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // resize window based on screen size
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth *0.5, window.innerHeight *0.5);
        render();
    }
    
    // animate
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      render();
    }
  
    // render the scene
    function render() {
      renderer.render(scene, camera);
    }

    animate();

    // function to export the scene to png
    const exportToPNG = () => {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      const renderer = new THREE.WebGLRenderer(); // Create a new renderer
    
      // Set the renderer size to match the canvas size
      renderer.setSize(canvas.width, canvas.height);
    
      // Render the scene to the new renderer
      renderer.render(scene, camera);
    
      // Convert the renderer's domElement to data URL
      const dataURL = renderer.domElement.toDataURL('image/png');
    
      // Set the link href to the data URL
      link.href = dataURL;
    
      // Set the link download attribute with a filename
      link.download = '3d_model.png';
    
      // Simulate a click on the link to trigger the download
      link.click();
    };

    // Add event listener to the export button
    const exportButton = document.getElementById('exportButton');
    exportButton.addEventListener('click', exportToPNG);

    // clean up 
    return () => {
      container.removeChild(renderer.domElement);
      window.removeEventListener('resize', onWindowResize);
      exportButton.removeEventListener('click', exportToPNG);
    };
  }, [width, selectedColor, shape]); // scene will update whenever these variables change

  return(
    <div>
    <canvas ref={canvasRef} style={{ display: 'none' }} />
    <button id="exportButton" style={{position:'absolute', bottom:-100, left: 20}}>Export to PNG</button>

    {/* ... (existing code) */}
  </div>
  ) 
}

export{ThreeDModel}

