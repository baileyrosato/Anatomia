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