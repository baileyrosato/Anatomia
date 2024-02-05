import { Stack, ColorInput, Switch} from "@mantine/core";
import {Female, Male} from '@mui/icons-material';
import {
  SwatchesColors,
  useCharacterCustomization,
} from "./CharacterCustomizationContext.jsx";

export const SettingsConfigurator = () => {
  const {
    skinColor,
    setSkinColor,
    selectedGender, 
    setGender, 
  } = useCharacterCustomization();

  const femaleIcon = (
    <Female/>
  );

  const maleIcon = (
    <Male/>
  );

  return (
    <Stack spacing={"xs"} py={"sm"}>
      <div>
        <p>Skin Tone:</p>
      <ColorInput
        format="hex"
        swatches={SwatchesColors}
        value={skinColor}
        onChange={setSkinColor}
      />
       </div>
      <div>
        <p>Biological Sex:</p>
      <Switch 
        size="md" 
        color="dark.4" 
        onLabel={femaleIcon} 
        offLabel={maleIcon}
        checked={selectedGender === 'female'}
        onChange={() => setGender(selectedGender === 'female' ? 'male' : 'female')} />
        </div>
    </Stack>
  );
};