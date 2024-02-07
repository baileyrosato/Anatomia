import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container} from '@mui/material';
import myImage from './images/Anatomy_Course_Image.jpg';
import { Box } from '@mui/system';

export default function CourseEntry() {
//   const classes = useStyles();
  const [courseCode, setCourseCode] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCourseCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (courseCode.toUpperCase() === "BIO201") {
      console.log("Course code is correct", courseCode);
      navigate('/MainMenu');
    } else {
      window.alert("Incorrect course code.");
    }
  };

  return (
    <Container 
      component="main" 
      maxWidth="md"
      display="flex"
      sx={{ 
        p: 4, 
        border: '20px solid rgb(176, 168, 168)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
        }}
    >
      <Box
      >
        <img src={myImage} alt=""/>
      </Box>
      <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{
            minWidth: '30%',
            justifyContent: 'center',
          }}
      >
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="courseCode"
            label="Please enter course code"
            name="courseCode"
            value={courseCode}
            onChange={handleInputChange}
            sx = {{
                backgroundColor: '#182858',
                borderRadius: '15px',
                "::placeholder": '#d2c8bf',
            }}
        />
        <Button
        type="submit"
        variant="contained"
        sx = {{
            mt: 2,
            backgroundColor: 'd2c8bf',
        }}
        >
            Login
        </Button>
      </Box>


    </Container>
  );
}
