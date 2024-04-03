import React from 'react';
import { render } from '@testing-library/react';
import ModelPage from './ModelPage.js';
import { MantineProvider } from '@mantine/core';
import { CharacterCustomizationProvider } from "./CharacterCustomizationContext.jsx";
import { Canvas as MockCanvas } from "@react-three/fiber";

// mock the Canvas component
jest.mock("@react-three/fiber", () => ({
  ...jest.requireActual("@react-three/fiber"), 
  Canvas: jest.fn(props => <div data-testid="canvas" {...props}></div>)
}));

describe('ModelPage', () => {
  // test one
  it('renders Canvas with correct settings', () => {
    render( 
    <CharacterCustomizationProvider> 
      <MantineProvider> 
        <ModelPage subunit="test-subunit" />  
      </MantineProvider> 
    </CharacterCustomizationProvider>);
    expect(MockCanvas).toHaveBeenCalledWith(
      expect.objectContaining({
        camera: { position: [1, 1, 3], fov: 35 },
        shadows: true,
        gl: { preserveDrawingBuffer: true }
      }),
      {}
    );
  });
});