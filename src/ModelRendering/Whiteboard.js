import React from 'react';
import { Tldraw } from '@tldraw/tldraw';
import './Whiteboard.css';

const components ={
  DebugMenu: null,
}

const Whiteboard = ({ imageData }) => {
    return (
    <div className="whiteboard-container" >
      <Tldraw components={components}/>
    </div>
  );
};

export default Whiteboard;