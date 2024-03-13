import React, {startTransition, useCallback, useEffect} from "react";
import { Button, Group } from "@mantine/core";
import { useCharacterCustomization, CameraModes } from "./CharacterCustomizationContext.jsx";
import { SettingsConfigurator } from "./SettingsConfigurator.jsx";
import { Tooltip, IconButton} from "@mui/material/";
import {QuestionMark} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import DirectionalButtons from "./DirectionalButtons.jsx";
import PlaneControls from "./PlaneControls.jsx";

import "./Interface.css"; // import style sheet

const Interface = ({ orbitControlsRef, subunit}) => {
  const { headConfiguratorOpen, setHeadConfiguratorOpen, setCameraMode, 
    setMidPlaneVisible, setTranversePlaneVisible, setParaPlaneVisible, setFrontalPlaneVisible } = useCharacterCustomization();

  // function to export the model to png
  const exportModelToPNG = () => {
    const modelPageElement = document.querySelector('.model-page-container');
    html2canvas(modelPageElement).then(canvas => {
      const image = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = image;
      downloadLink.download = 'model_image.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  } 

  // function to reset camera and mode
  const handleResetCamera = useCallback(() => {
      if (orbitControlsRef.current) {
        orbitControlsRef.current.reset(); 
      }
      startTransition(() => {
        setCameraMode(CameraModes.HEAD);
      });
    },[orbitControlsRef, setCameraMode]);
    
  // function to reset plane visibility
  const resetPlaneVisibility = useCallback(() => {
    // reset all plane visibility states to true
    setMidPlaneVisible(true);
    setTranversePlaneVisible(true);
    setParaPlaneVisible(true);
    setFrontalPlaneVisible(true);
  },[setMidPlaneVisible, setTranversePlaneVisible, setParaPlaneVisible, setFrontalPlaneVisible]);

  // reset camera mode when leaving the directional terms page
  // and reset planes when leaving the planes of sectioning page
  useEffect(() => {
    if (subunit !== "Directional Terms") {
      handleResetCamera();
    }
    if (subunit !== "Planes of Sectioning")
    {
      resetPlaneVisibility();
    }
  }, [subunit, handleResetCamera, resetPlaneVisibility]);

  return (
    <div className="model-scene-container">
      <Tooltip title={
        <span>
          Use mouse or touch gestures to interact with the model. <br />
          Zoom: scroll <br />
          Rotate: left click and drag <br />
          Pan: right click and drag
        </span>
      } placement="top">
        <IconButton>
          <QuestionMark/>
        </IconButton>
      </Tooltip>
      
      <div style={{ position: 'absolute', top: '20%', left: '5%' }}> 
        <Group>
          <Button
            variant={headConfiguratorOpen ? "filled" : "light"}
            onClick={() => setHeadConfiguratorOpen(!headConfiguratorOpen)}
            className="settings-button"
            title="Toggle Model Settings"
          >
            Model Settings
          </Button>
          {/* render buttons only if the subunit page is the right one
          TODO: if we end up having a lot of conditional displays, might make a new file for this*/}
          {subunit === "Directional Terms" && <DirectionalButtons />}
          {subunit === "Planes of Sectioning" && <PlaneControls/>} 
        </Group>
      </div>
      <div style={{ position: 'absolute', top: '25%', left: '5%' }}> 
      {headConfiguratorOpen && <SettingsConfigurator />}
      </div>
      <Button onClick={handleResetCamera}>Reset Camera</Button>
      <Button onClick={exportModelToPNG} style={{ marginLeft: '12px' }}>Export Model</Button>
    </div>
  );
};

export default Interface;