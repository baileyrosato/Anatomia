// PlaneControls.jsx
import React, { useState} from "react";
import { Button, Popover } from '@mui/material';
import { useCharacterCustomization } from "./CharacterCustomizationContext.jsx";

function PlaneControls() {
    const {
      midPlaneVisible,
      setMidPlaneVisible,
      tranversePlaneVisible,
      setTranversePlaneVisible,
      paraSagPlaneVisible, 
      setParaPlaneVisible,
      frontalPlaneVisible,
      setFrontalPlaneVisible,
    } = useCharacterCustomization();
  
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePlaneButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null); 
    };

    const open = Boolean(anchorEl);
    const id = open ? 'plane-controls-popover' : undefined;

    return (
    <>
    <Button style={{ float: 'right'}} className="PlanesButton" data-testid = "plane-buttons" onClick={handlePlaneButtonClick}>Planes </Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '5px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h4>Plane Controls</h4>
            <Button style={{ 
                backgroundColor: midPlaneVisible ? '' : '#1E88E5', 
                color: midPlaneVisible ? '#1E88E5' : 'white', 
                marginBottom: '8px' }} 
                onClick={() => setMidPlaneVisible(!midPlaneVisible)}>MidSagittal
            </Button>
            <Button style={{ 
                backgroundColor: tranversePlaneVisible ? '' : '#004D40', 
                color: tranversePlaneVisible ? '#004D40' : 'white', 
                marginBottom: '8px' }} 
                onClick={() => setTranversePlaneVisible(!tranversePlaneVisible)}>Tranverse
            </Button>
            <Button style={{ 
                backgroundColor: paraSagPlaneVisible ? '' : '#FFC107', 
                color: paraSagPlaneVisible ? '#FFC107' : 'white', marginBottom: '8px' }} 
                onClick={() => setParaPlaneVisible(!paraSagPlaneVisible)}>ParaSagittal
            </Button>
            <Button style={{ 
                backgroundColor: frontalPlaneVisible ? '' : '#D81B60', 
                color: frontalPlaneVisible ? '#D81B60' : 'white',  
                marginBottom: '8px' }} 
                onClick={() => setFrontalPlaneVisible(!frontalPlaneVisible)}>Frontal
            </Button>
        </div>
        </Popover>
    </>
    );
}
export default PlaneControls;