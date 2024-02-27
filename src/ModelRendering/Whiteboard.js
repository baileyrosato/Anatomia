import React from 'react';
import { Tldraw } from '@tldraw/tldraw';

const Whiteboard = ({ imageData }) => {
  return (
    <div className="whiteboard-container" style={{ width: '80%', height: '80%', margin: "auto", position: 'fixed', inset: 0 }}>
      <Tldraw backgroundImage={imageData} />
    </div>
  );
};

export default Whiteboard;