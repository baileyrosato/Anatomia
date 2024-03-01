import React from "react";
import { Button, Group } from "@mantine/core";
import { useCharacterCustomization } from "./CharacterCustomizationContext.jsx";
import { SettingsConfigurator } from "./SettingsConfigurator.jsx";
import { Tooltip, IconButton} from "@mui/material/";
import {QuestionMark} from '@mui/icons-material';
import html2canvas from 'html2canvas';


import "./Interface.css"; // import style sheet

const Interface = ({ orbitControlsRef }) => {
  const { headConfiguratorOpen, setHeadConfiguratorOpen } = useCharacterCustomization();

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

  const handleResetCamera = () => {
      console.log("orbitControlsRef:", orbitControlsRef);
      if (orbitControlsRef.current) {
        orbitControlsRef.current.reset(); 
      }
  };

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