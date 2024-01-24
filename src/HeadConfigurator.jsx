import { Stack, ColorInput} from "@mantine/core";
import {
  SwatchesColors,
  useCharacterCustomization,
} from "./CharacterCustomizationContext.jsx";

export const HeadConfigurator = () => {
  const {
    skinColor,
    setSkinColor,
    bodySize,
    setBodySize,
  } = useCharacterCustomization();

  return (
    <Stack spacing={"sm"} py={"sm"}>
      <ColorInput
        label="Skin Tone"
        format="hex"
        swatches={SwatchesColors}
        value={skinColor}
        onChange={setSkinColor}
      />
    </Stack>
  );
};