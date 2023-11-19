// MainMenu.js

// import react
import React from 'react';
import { Link } from "react-router-dom";

// import './MainMenu.css';


// define the course data structure (TODO: This possibly needs to be stored 
// in the database and retrieved instead of having a data structure here)
const courseData = [
  {
    unit: 'Unit 1',
    subunits: ['Subunit 1.1', 'Subunit 1.2', 'Subunit 1.3']
  },
  {
    unit: 'Unit 2',
    subunits: ['Subunit 2.1', 'Subunit 2.2', 'Subunit 2.3']
  },
  // Add more units as needed
];

export default function MainMenu() {
  return (
    <div className="main-menu">
      <h2>Main Menu</h2>
      <ul>
        {courseData.map((course, index) => (
          <li key={index}>
            <span>{course.unit}</span>
            <ul>
              {course.subunits.map((subunit, subIndex) => (
                <li key={subIndex}>
                  <Link to={`/course/${course.unit}/${subunit}`}>
                    {subunit}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}