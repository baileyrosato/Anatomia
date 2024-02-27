import React, {useState} from "react";
import { Button, Group } from "@mantine/core";
import { useCharacterCustomization } from "./CharacterCustomizationContext.jsx";
import { SettingsConfigurator } from "./SettingsConfigurator.jsx";
import { Tooltip, IconButton, Dialog, DialogContent } from "@mui/material/";
import {QuestionMark} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import Whiteboard from './Whiteboard';

import "./Interface.css"; // import style sheet

const Interface = ({ orbitControlsRef }) => {
  const { headConfiguratorOpen, setHeadConfiguratorOpen } = useCharacterCustomization();
  const [showWhiteboard, setShowWhiteboard] = useState(false); 
  const [imageData, setImageData] = useState(null);

  const whiteboardModel = () => {
    const modelPageElement = document.querySelector('.model-page-container');

    html2canvas(modelPageElement).then(canvas => {
      const image = canvas.toDataURL('image/png');

      setImageData(image);
      setShowWhiteboard(true);

      // THIS IS CODE TO DOWNLOAD PNG
      // const downloadLink = document.createElement('a');
      // downloadLink.href = image;
      // downloadLink.download = 'model_image.png';
      // document.body.appendChild(downloadLink);
      // downloadLink.click();
      // document.body.removeChild(downloadLink);
    });
  } 

  const handleResetCamera = () => {
      console.log("orbitControlsRef:", orbitControlsRef);
      if (orbitControlsRef.current) {
        orbitControlsRef.current.reset(); 
      }
  };

  const handleCloseWhiteboard = () => {
    setShowWhiteboard(false);
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
       
       {/* button to save model page as image */}
      <Button onClick={whiteboardModel} style={{ marginLeft: '12px' }}>Whiteboard</Button>
      {/* Whiteboard dialog */}
      <Dialog fullScreen open={showWhiteboard} onClose={handleCloseWhiteboard}>
        <DialogContent>
          <Whiteboard imageData={imageData} />
          <Button onClick={handleCloseWhiteboard}>Return to Model</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Interface;