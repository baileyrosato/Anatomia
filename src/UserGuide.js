// UserGuide.js
import React from 'react';

import DownloadPDFButton from "./DownloadPDF.js"
import Nav from "./Navigation.js"

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
    </div>
    </div>
  );
}