// UserGuide.js
import React from 'react';

import DownloadPDFButton from "./DownloadPDF.js"
import Nav from "./Navigation.js"

import './UserGuide.css';

export default function UserGuide() {
  return (
    <div>
      <div className="Navigation">
          <Nav />
      </div>
      <div className="user-guide">
        <div className="user-guide-content">
          <h1>User Guide</h1>
          <p>
          Welcome to the Anatomia User Guide! This comprehensive guide is designed
          to help you navigate and make the most of your experience with our 
          3D anatomy & physiology program. Whether you are a student or instructor,
          this program offers an inclusive and educational learning experience of the 
          human body. Click the button below to view and download the user guide.
          </p>
        </div>
        
        <div className="downloadLink">
            <DownloadPDFButton />
        </div>
        <li className='about-team-link'>
          <a href="https://ceias.nau.edu/capstone/projects/CS/2024/Anatomia_F23/">About The Developers</a>
        </li>
      </div>
    </div>
  );
}