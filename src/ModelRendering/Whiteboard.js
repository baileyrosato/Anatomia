import React from 'react';
import { Tldraw } from '@tldraw/tldraw';

const Whiteboard = ({ imageData }) => {
    return (
    <div className="whiteboard-container" >
      <Tldraw />
    </div>
  );
};

export default Whiteboard;