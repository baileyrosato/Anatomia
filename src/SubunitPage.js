// SubunitPage.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MantineProvider, Button } from "@mantine/core";
import ModelPage from "./ModelRendering/ModelPage.js";
import { CharacterCustomizationProvider } from "./ModelRendering/CharacterCustomizationContext.jsx";
import Notes from './NotesFeature/AddingNotesFeature.jsx'
import './SubunitPage.css';
import Menu from "./Navigation.js";
import jsPDF from 'jspdf';
import { Drawer, Box, IconButton} from '@mui/material';
import { Close } from '@mui/icons-material';

import { fetchSubunitData, fetchSubunitImageDownloadUrl } from './Database/databaseUtils.js';

export default function SubunitPage() {
  // get the unit and subunit parameters
  const { unit, subunit } = useParams();
  const [subunitDescription, setSubunitDescription] = useState("");
  const [note, setNote] = useState({id: Date.now(), content: ''});
  const [open, setOpen] = useState(false);
  const [subunitImage, setSubunitImage] = useState("");


  useEffect(() => {
    setSubunitDescription("");
    setSubunitImage("");
    fetchSubunitData(unit, subunit)
    .then((subunitData) => {
      setSubunitDescription(subunitData.description); 
      if (subunitData.image) {
        fetchSubunitImageDownloadUrl(subunitData.image)
          .then((url) => {
            setSubunitImage(url);
          })
          .catch((error) => {
            console.error('Error getting download URL:', error);
          });
      }
    })
    .catch((error) => {
      console.error('Error fetching subunit data:', error);
    });
}, [unit, subunit]); // fetch description and image if the unit and subunit changes

  // handling the content in order for the note not to disappear
  function handleContentChange(newContent) {
    setNote({...note, content: newContent});
  }

  // function saving to export to pdf
  function exportNote(){
    const document = new jsPDF();
    const text = note.content;
    document.text(text, 10, 10);
    // Get current date and format it as yyyy-mm-dd
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    // save the document name with the date
    document.save(`note_${formattedDate}.pdf`);
  }

  return (
  <CharacterCustomizationProvider>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        globalStyles: (_theme) => ({
          body: {
            width: "100vw",
            height: "100vh",
          },
          "#root": {
            width: "100%",
            height: "100%",
          },
        }),
      }} 
    > 
    <Box 
      sx={{ 
        float: 'right', 
        marginTop: '150px', 
        marginRight: '100px'
      }}>
      <Button  
        onClick={() => setOpen(true)}> Notes </Button>
    </Box>

    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      disableEnforceFocus
    >
      <IconButton onClick={() => setOpen(false)} style={{ alignSelf: 'flex-start', margin: '8px' }}>
            <Close />
      </IconButton>

      <Box>
        {note.id !== null && <Notes content={note.content} 
          onContentChange={handleContentChange} />}
      </Box>

    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button 
        onClick={exportNote}> Export Note </Button>
    </Box>
    </Drawer>

    
     <div className="subunit-page">
        
        {/* Hamburger menu */}
        <div className="HamburgerMenu">
          <Menu />
        </div>

        {/*Unit Titles*/}
        <div className="unit-container">
          <div className="unit-titles-container">
            <h2>{unit}</h2>
            <h3>{subunit}</h3>
          </div>
        </div>

        {/*Model Container*/}
            <div className="model-container">
              <ModelPage />
            </div>

         {/* Embedded container with scrollbar that displays the subunit description and image */}
         <div className="unit-content-container">
            <div className="unit-content">
              {subunitDescription}
              {subunitImage && <img src={subunitImage} alt="Subunit" className="subunit-image" />}
            </div>
          </div>
      </div>

    </MantineProvider>
    </CharacterCustomizationProvider>
  );
}
