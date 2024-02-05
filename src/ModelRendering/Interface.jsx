import { Affix, Button, Group } from "@mantine/core";
import { useCharacterCustomization } from "./CharacterCustomizationContext.jsx";
import { SettingsConfigurator } from "./SettingsConfigurator.jsx";
import {Tooltip} from "@mui/material/";
import {QuestionMark} from '@mui/icons-material';

import "./Interface.css"; // import style sheet
import { IconButton} from "@mui/material";

const Interface = () => {
  const { headConfiguratorOpen, setHeadConfiguratorOpen } = useCharacterCustomization();
  return (
    <div className="model-scene-container">
      <Tooltip title={
    <span>
      Use mouse or touch gestures to interact with the model. <br />
      Zoom: scroll <br />
      Rotate: left click and drag <br />
      Pan: right click and drag
    </span>
  } placement="bottom">
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
      {/* ... Other components ... */}
    </div>
  );
};

export default Interface;
