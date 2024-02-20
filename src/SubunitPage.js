// SubunitPage.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MantineProvider } from "@mantine/core";
import ModelPage from "./ModelRendering/ModelPage.js";
import { CharacterCustomizationProvider } from "./ModelRendering/CharacterCustomizationContext.jsx";
import Notes from './NotesFeature/AddingNotesFeature.jsx'
import './SubunitPage.css';
import Menu from "./Navigation.js";
import jsPDF from 'jspdf';
import { Button, Drawer, Box} from '@mui/material';

import { firebase } from './config.js';

export default function SubunitPage() {
  // get the unit and subunit parameters
  const { unit, subunit } = useParams();
  const [subunitDescription, setSubunitDescription] = useState("");
  const [note, setNote] = useState({id: Date.now(), content: ''});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSubunitDescription("");
    // fetch courseData from database
    const courseDataRef = firebase.database().ref('courseData');
    courseDataRef.once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          // find the index of the unit
          const foundUnitIndex = data.findIndex((course) => course.unit === unit);
        
          // find the index of the subunit within the unit
          const foundSubunitIndex = data[foundUnitIndex]?.subunits.findIndex((sub) => sub.title === subunit);

          // fetch subunit description from database using the indices
          if (foundUnitIndex !== -1 && foundSubunitIndex !== -1) {
            const subunitRef = firebase.database().ref(`courseData/${foundUnitIndex}/subunits/${foundSubunitIndex}/description`);
            subunitRef.once('value')
              .then((snapshot) => {
                const description = snapshot.val();
                if (description) {
                  setSubunitDescription(description); 
                }
              })
              .catch((error) => {
                console.error('Error fetching subunit description from the database:', error);
              });
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching course data from the database:', error);
      });
  }, [unit, subunit]); // fetch description whenever unit or subunit changes

  // handling the content in order for the note not to disappear
  function handleContentChange(newContent) {
    setNote({...note, content: newContent});
  }

  // function saving to export to pdf
  function exportNote(){
    const document = new jsPDF();
    const text = note.content;
    document.text(text, 10, 10);
    document.save('note.pdf')
  }

  return (
  <CharacterCustomizationProvider>
    <Box 
      sx={{ 
        float: 'right', 
        marginTop: '150px', 
        marginRight: '100px'
      }}>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setOpen(true)}> Notes </Button>
    </Box>

    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      disableEnforceFocus
    >
      <Button onClick={() => setOpen(false)}>Close</Button>

      <Box>
      {note.id !== null && <Notes content={note.content} 
      onContentChange={handleContentChange} />}
      </Box>

    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={exportNote}> Export Note </Button>
    </Box>
    </Drawer>

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

         {/* Embedded container with scrollbar */}
         <div className="unit-content-container">
            <div className="unit-content">
              {subunitDescription}
            </div>
          </div>
      </div>

    </MantineProvider>
    </CharacterCustomizationProvider>
  );
}
