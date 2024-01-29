import { Affix, Button, Group } from "@mantine/core";
import { useCharacterCustomization } from "./CharacterCustomizationContext.jsx";
import { SettingsConfigurator } from "./SettingsConfigurator.jsx";

import "./Interface.css"; // import style sheet

const Interface = () => {
  const { headConfiguratorOpen, setHeadConfiguratorOpen } = useCharacterCustomization();
  return (
    <div className="model-scene-container">
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
