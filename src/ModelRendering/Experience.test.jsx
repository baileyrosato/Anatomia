import React from 'react';
import { render } from '@testing-library/react';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx';

describe('Experience component tests', () => {
//     it('Renders camera controls', () => {
//         const orbitControlsRef = { current: null };
//         const { getByTestId } = render(<Canvas><Experience orbitControlsRef={orbitControlsRef} /> </Canvas>);
//         const cameraControls = getByTestId('camera-controls');
//         expect(cameraControls).toBeInTheDocument();
//   });

it('Ambient Light is rendered', () => {
    const orbitControlsRef = { current: null };
    const { getByTestId } = render(
      <Canvas>
        <Experience orbitControlsRef={orbitControlsRef} />
      </Canvas>
    );

    // Use getByTestId to find the ambient light element
    const ambientLight = getByTestId('ambient-light');

    // Assert that the ambient light element is in the document
    expect(ambientLight).toBeInTheDocument();
  });

//   test('Directional Lights are rendered with correct positions', () => {
//     const { container } = render(<Experience />);
//     const directionalLights = container.querySelectorAll('directionalLight');
//     expect(directionalLights.length).toBe(2); // Ensure two directional lights are present
//     expect(directionalLights[0]).toHaveAttribute('position', '5 10 7'); // Check position of first directional light
//     expect(directionalLights[1]).toHaveAttribute('position', '-5 -10 -7'); // Check position of second directional light
//   });
});