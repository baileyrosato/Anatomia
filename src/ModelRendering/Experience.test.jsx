import React from 'react';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';

describe('Experience component tests', () => {
    it('renders the component', () => {
      const orbitControlsRef = { current: null };
      render(
        <Canvas>
          <Experience orbitControlsRef={orbitControlsRef} />
        </Canvas>
      );
  });
});