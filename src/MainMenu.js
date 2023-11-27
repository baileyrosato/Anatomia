// MainMenu.js

// import react
import React, {useState} from 'react';
import { Link } from "react-router-dom";

import './MainMenu.css';
import Nav from "./Navigation"
import DownloadPDFButton from "./DownloadPDF"


// define the course data structure (TODO: This possibly needs to be stored 
// in the database and retrieved instead of having a data structure here)
const courseData = [
  {
    unit: 'Unit 1: Organs, Systems, and the Organization of the Body',
    subunits: ['Directional Terms', 'Subunit 1.2', 'Subunit 1.3']
  },
  {
    unit: 'Unit 2: Coming Soon...',
    subunits: ['Subunit 2.1', 'Subunit 2.2', 'Subunit 2.3']
  },
  {
    unit: 'Unit 3: Coming Soon...',
    subunits: ['Subunit 3.1', 'Subunit 3.2', 'Subunit 3.3']
  },
  {
    unit: 'User Guide',
    // TODO: decide on actual subsections lol
    subunits: ['Getting Started', 'Navigating Application', 'Adjusting the Model']
  },
  // add more units as needed
];

export default function MainMenu() {

  // use state to manage the expanded/collapsed state of units
  const [expandedUnits, setExpandedUnits] = useState([]);

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
      <div className="Navigation">
        <Nav />
      </div>
      <h2>BIO201 Menu</h2>
      <ul>
        {courseData.map((course, index) => (
          <li key={index} className='unit-container'>
            <span
              // toggle the expanded state when clicked
              onClick={() => toggleUnit(course.unit)}
              className={expandedUnits.includes(course.unit) ? 'expanded' : ''}
            >
               {expandedUnits.includes(course.unit) ? '▼ ' : '▶ '}
              {course.unit}
            </span>
            {/* render subunits only if the unit is expanded */}
            {expandedUnits.includes(course.unit) && (
              <ul>
                {course.subunits.map((subunit, subIndex) => (
                  <li key={subIndex} className='subunit-container'>
                    <Link to={`/course/${course.unit}/${subunit}`}>{subunit}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="downloadLink">
        <DownloadPDFButton />
      </div>
    </div>
  );
}