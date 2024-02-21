import { Stack, ColorInput, Switch} from "@mantine/core";
import { Select, MenuItem, FormControl} from "@mui/material";
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
    bodySize,
    setBodySize,
  } = useCharacterCustomization();

  // sets body size value
  const handleChange = (event) => {
    setBodySize(event.target.value);
  };

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
      <div>
        <p>Body Size:</p>
        <FormControl sx={{minWidth: 120}} size ="small">
      <Select
        labelId="body-type-select-label"
        id="body-type-select"
        value={bodySize}
        onChange={handleChange}
        >
          <MenuItem value={1}>Body 1</MenuItem>
          <MenuItem value={2}>Body 2</MenuItem>
          <MenuItem value={3}>Body 3</MenuItem>
          <MenuItem value={4}>Body 4</MenuItem>
          <MenuItem value={5}>Body 5</MenuItem>
          <MenuItem value={6}>Body 6</MenuItem>
          <MenuItem value={7}>Body 7</MenuItem>
          <MenuItem value={8}>Body 8</MenuItem>
        </Select>
        </FormControl>
        </div>
    </Stack>
  );
};
