import { Button, Group } from "@mantine/core";
import { useCharacterCustomization } from "./CharacterCustomizationContext.jsx";
import { SettingsConfigurator } from "./SettingsConfigurator.jsx";
import {Tooltip, IconButton} from "@mui/material/";
import {QuestionMark} from '@mui/icons-material';
import { useRef } from "react"; // Import useRef

import "./Interface.css"; // import style sheet

const Interface = () => {
  const { headConfiguratorOpen, setHeadConfiguratorOpen } = useCharacterCustomization();
  const orbitControlsRef = useRef(); 

  const handleResetCamera = () => {
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
      <Button onClick={handleResetCamera}>Reset Camera</Button> {/* Add reset button */}
    </div>
  );
};

export default Interface;
