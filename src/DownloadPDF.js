import React from 'react';

function DownloadPDFButton() {
    return (
      <div>
  
        <a
          href="/UserGuide.pdf"
          download="BIO201-WebApplication-UserGuide"
          target="_blank"
          rel="noreferrer"
        >
          <button>Download User Guide</button>
        </a>
      </div>
    );
  }
  
  export default DownloadPDFButton;