import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import myImage from './images/Anatomy_Course_Image.jpg';
import {Button, CssBaseline,TextField,Link, Paper, Box, Grid, Typography, Alert} from '@mui/material';

// function to add a link to our github
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/baileyrosato/Anatomia/tree/main">
        Anatomia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function CourseEntry() {
  const [courseCode, setCourseCode] = useState('');
  const [alertType, setAlertType] = useState(null);
  const navigate = useNavigate();

 const handleInputChange = (event) => {
  setCourseCode(event.target.value);
};

  // check to see if entered course code is correct
  const handleSubmit = (event) => {
    event.preventDefault();
    if (courseCode.toUpperCase() === 'BIO201') {
      setAlertType('success');
      navigate('/MainMenu');
    } else {
      setAlertType('error');
      setCourseCode('');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh'}}>
      <CssBaseline />
      {/* add biology specific image to page*/}
      <Grid item xs={false} sm={4} md={7}
        sx={{
          backgroundImage: `url(${myImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{backgroundColor: 'rgb(251,248,243)'}}>
        <Box
          sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '75%' }}>
          {/* add title */}
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
            Diversified Anatomy and Physiology <br /> Lab Resource
          </Typography>
          {/* create login form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {/* course code input box */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="courseCode"
              inputProps={{"data-testid": "courseCode-input"}}
              label="Please enter a course code"
              name="courseCode"
              value={courseCode}
              onChange={handleInputChange}
              autoFocus
            />
            {/* submit button */}
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2 }}>
              Submit
            </Button>
            {/* show alert if incorrect code is submitted */}
            {alertType === 'error' && (
              <Alert sx={{ mb: 2 }} severity="error">
                Incorrect course code. Please try again.
              </Alert>
            )}
            {/* show copyright and github link */}
            <Copyright />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
