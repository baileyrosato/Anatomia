// Navigation.js

// import react
import React, {useState, useEffect} from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

// import firebase database
import { firebase } from './config.js';

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
    <div className="hamburger-menu">
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {isMenuOpen && (
        <div className="menu-items">
          {courseData.map((course, index) => (
            <li key={index}>
              {course.unit !== "User Guide" ? (
              <span
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
                    <li key={subIndex}>
                      <Link to={`/course/${course.unit}/${subunit}`}>{subunit}</Link>
                    </li>
                  ))}
                </ul>
              )}
              </li>
          ))}
        </div>
      )}
    </div>
  );
};
export default HamburgerMenu;
