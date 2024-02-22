import React from 'react';
import { Button } from '@mui/material'

function DownloadPDFButton() {
    return (
      <div>
        <Button
        variant="contained"
        color="primary"
        component="a"
        href="/UserGuide.pdf"
        download="BIO201-WebApplication-UserGuide"
        target="_blank"
        rel="noreferrer"
      >
        Download User Guide
      </Button>
      </div>
    );
  }
  
  export default DownloadPDFButton;