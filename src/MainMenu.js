// MainMenu.js

// import react
import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";

// import firebase database
import { firebase } from './config.js';

import './MainMenu.css';


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
  const toggleUnit = (unit) => {
  if (expandedUnits.includes(unit)) 
    {
      setExpandedUnits(expandedUnits.filter((item) => item !== unit));
    } 
  else 
    {
        setExpandedUnits([...expandedUnits, unit]);
    }
  };


  return (
    <div className="main-menu">
      <h2>BIO201 Menu</h2>
      <ul>
        {courseData.map((course, index) => (
          <li key={index} className='unit-container'>
            {course.unit !== "User Guide" ? (
              <span
                // toggle the expanded state when clicked
                onClick={() => toggleUnit(course.unit)}
                className={expandedUnits.includes(course.unit) ? 'expanded' : ''}
              >
                {expandedUnits.includes(course.unit) ? '▼ ' : '▶ '}
                {course.unit}
              </span>
            ) : (
              <Link to="/user-guide" className="custom-link">
              <span>
                {course.unit}
              </span>
            </Link>
            )}

            {expandedUnits.includes(course.unit) && (
              <ul>
                {course.subunits.map((subunit, subIndex) => (
                  <li key={subIndex} className="subunit-container">
                    <Link to={`/course/${course.unit}/${subunit}`}>{subunit}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      
    </div>
  );
}