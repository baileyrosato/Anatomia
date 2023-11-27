// import React
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import other pages
import CourseEntry from "./CourseEntry.js";
import MainMenu from "./MainMenu.js";
import SubunitPage from "./SubunitPage.js"; 

// import style sheet
import './App.css';

export default function App() {
  return (
    // define routes to other pages
    <Router>
      <Routes> 
        <Route exact path="/" element={<CourseEntry />} />
        <Route path="/MainMenu" element={<MainMenu />} />
        <Route path="/course/:unit/:subunit" element={<SubunitPage />} />
      </Routes>
    </Router>
  )
}