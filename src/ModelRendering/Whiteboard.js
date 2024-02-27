import React from 'react';
import { Tldraw } from '@tldraw/tldraw';

const Whiteboard = ({ imageData }) => {

  // const components = {
  //   Background: imageData,
  // }
  

  return (
    <div className="whiteboard-container" style={{ width: '80%', height: '80%', margin: "auto", position: 'fixed', inset: 0 }}>
      <Tldraw />
    </div>
  );
};

export default Whiteboard;