import { Affix, Button, Group } from "@mantine/core";
import { useCharacterCustomization } from "./CharacterCustomizationContext.jsx";
import { SettingsConfigurator } from "./SettingsConfigurator.jsx";
import {Tooltip, IconButton} from "@mui/material/";
import {QuestionMark} from '@mui/icons-material';
import { useRef } from "react"; // Import useRef

import "./Interface.css"; // import style sheet

const Interface = () => {
  const { headConfiguratorOpen, setHeadConfiguratorOpen } = useCharacterCustomization();
  const orbitControlsRef = useRef(); // Reference to OrbitControls component

  const handleResetCamera = () => {
    if (orbitControlsRef.current) {
      orbitControlsRef.current.reset(); // Call reset method of OrbitControls
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
      <Affix position={{ top: 180, left: 50 }}>
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
        <Affix position={{ top: 200, left: 50 }}>
          {headConfiguratorOpen && <SettingsConfigurator />}
        </Affix>
      </Affix>
      <Button onClick={handleResetCamera}>Reset Camera</Button> {/* Add reset button */}
      {/* ... Other components, Export button ... */}
    </div>
  );
};

export default Interface;
