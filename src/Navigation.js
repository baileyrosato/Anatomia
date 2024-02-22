// Navigation.js

// import react
import React, {useState, useEffect} from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

// material UI imports
import { Drawer } from '@mui/material'
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemText } from '@mui/material'
import { IconButton } from '@mui/material'
import { Menu, Close } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';

// import firebase database
import { firebase } from './Database/config.js';

const HamburgerMenu = () => {
  const [courseData, setCourseData] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState([]);

  useEffect(() => {
    // get data from database
    const fetchData = async () => {
      try {
        const snapshot = await firebase.database().ref('courseData').once('value');
        const data = snapshot.val();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchData();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // expand units to show subunit
  const toggleUnit = (unit) => {
    setExpandedUnits((prevExpandedUnits) =>
      prevExpandedUnits.includes(unit)
        ? prevExpandedUnits.filter((item) => item !== unit)
        : [...prevExpandedUnits, unit]
    );
  };

  return (
    // creating the class for the hamburger icon and a MUI drawer element 
    <div className="hamburger-menu">
      <IconButton onClick={toggleMenu}>
        <Menu />
      </IconButton>
      <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
        <List>
          <IconButton onClick={toggleMenu} style={{ alignSelf: 'flex-end', margin: '8px' }}>
            <Close />
          </IconButton>

          {/* Main Menu Page */}
          <ListItem button>
            <Link to="/MainMenu" className="custom-link" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary="Main Menu" />
            </Link>
          </ListItem>
          
          {courseData.map((course, index) => (
             // ALL CODE BELOW THIS POINT IS BEING REUSED FROM THE MAIN MENU
            <div key={index} className='unit-container'> 
            {/* check if the current unit is not the user guide */}
            {course.unit !== "User Guide" ? (
              // If not the user guide, render as a normal unit
              <React.Fragment>
                <ListItem 
                  // on click function to toggle unit
                  // button is deprecated but allows highlighting of unit when click
                  button 
                  onClick={() => toggleUnit(course.unit)}
                  // check if the current unit is expanded 
                  className={expandedUnits.includes(course.unit) ? 'expanded' : ''}
                >
                  <ListItemText primary={course.unit} />
                  {expandedUnits.includes(course.unit) ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
  
                <Collapse in={expandedUnits.includes(course.unit)} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {course.subunits.map((subunit, subIndex) => (
                      // create a unit for the subunit info
                      <ListItem key={subIndex} className="subunit-container" style={{ paddingLeft: '32px'}}>
                        <Link to={`/course/${course.unit}/${subunit.title}`}>
                          <ListItemText primary={subunit.title} />
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              // if user guide, direct the user to user guide page
              <div style={{ width: '100px' }}>
                <Link to="/user-guide" className="custom-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemText primary={course.unit} style={{ marginLeft: '16px' }} />
                </Link>
              </div>
        )}
      </div>
    ))}
      </List>
    </Drawer>
  </div>
  );
};

export default HamburgerMenu;
