// MainMenu.js

// import react
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

// import material UI 
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { Collapse } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';
import { ExpandMore } from '@mui/icons-material';

// import firebase database
import { firebase } from './Database/config.js';

// import './MainMenu.css';


export default function MainMenu() {

  // use state to manage the expanded/collapsed state of units
  const [courseData, setCourseData] = useState([]);
  const [expandedUnits, setExpandedUnits] = useState([]);

  useEffect(() => {
    // reference to the 'courseData' key in the database
    const courseDataRef = firebase.database().ref('courseData');

    // fetch course data from the database
    courseDataRef.once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          setCourseData(Object.values(data));
        }
      })
      .catch((error) => {
        console.error('Error fetching course data from the database:', error);
      });
  }, []); // the empty dependency array ensures that this effect runs once on component mount


  // toggle the expanded state of a unit
  const toggleUnit = (unit) =>  {
    setExpandedUnits((prevExpandedUnits) => {
      // tracks if the unit has already been expanded
      const isUnitExpanded = prevExpandedUnits.includes(unit);
      return isUnitExpanded
        ? prevExpandedUnits.filter((item) => item !== unit)
        : [...prevExpandedUnits, unit];
    });
  };
 
  return (
    <div className="main-menu">
      <h2>BIO201 Menu</h2>
      <List>
        {courseData.map((course, index) => (
          // create a container for the unit info
          <div key={index} className='unit-container'>
            {/* check if the current unit is not the user guide */}
            {course.unit !== "User Guide" ? (
              // If not the user guide, render as a normal unit
              <React.Fragment>
                <ListItem
                  // on click function to toggle unit
                  // button is deprecated but allows highlighting of unit when clicked
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
                      <ListItem key={subIndex} className="subunit-container" style={{ paddingLeft: '32px' }}>
                        <Link to={`/course/${course.unit}/${subunit.title}`}>
                          <ListItemText primary={subunit.title} />
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ) : (
              // if user guide, direct the user to user guide page with the same hover style
              <ListItem
                button
                component={Link}
                to="/user-guide"
                className={`unit-item user-guide-item ${expandedUnits.includes(course.unit) ? 'expanded' : ''}`}
              >
                <ListItemText primary={course.unit} />
              </ListItem>
            )}
          </div>
        ))}
      </List>
    </div>
  );
  }
