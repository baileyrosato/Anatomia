// DirectionalButtons.jsx
// this displays a drop down for camera modes
import React from 'react';
import { useCharacterCustomization, CameraModes } from "./CharacterCustomizationContext.jsx";
import { Select, MenuItem, FormControl} from '@mui/material';

function DirectionalButtons() {
  const { cameraMode, setCameraMode } = useCharacterCustomization();

  // function to handle changing camera mode
  const handleCameraModeChange = (event) => {
    setCameraMode(event.target.value);
  };

  return (
    <div className="camera-options" data-testid = 'directional-buttons'>
      <FormControl sx={{m: 1}} size="small">
      <Select 
      value={cameraMode} 
      onChange={handleCameraModeChange}>
        <MenuItem value={CameraModes.HEAD}>Free</MenuItem>
        <MenuItem value={CameraModes.POSTERIOR}>Posterior</MenuItem>
        <MenuItem value={CameraModes.ANTERIOR}>Anterior</MenuItem>
      </Select>
      </FormControl>
    </div>
  );
}

export default DirectionalButtons;