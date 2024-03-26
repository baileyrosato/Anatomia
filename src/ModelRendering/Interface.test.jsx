import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Interface from './Interface.jsx';
import { CharacterCustomizationProvider } from './CharacterCustomizationContext.jsx';
import { MantineProvider } from '@mantine/core';

// Mocking the matchMedia function
window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // Deprecated, but included for compatibility
  removeListener: jest.fn(), // Deprecated, but included for compatibility
}));

describe('Interface Component', () => {
//   it('renders without crashing', () => {
//     render(
//         <MantineProvider>
//       <CharacterCustomizationProvider>
//         <Interface orbitControlsRef={null} subunit="Directional Terms" />
//       </CharacterCustomizationProvider>
//       </MantineProvider>
//     );
//   });

// it('configures user settings such as skin color and body size correctly', () => {
//     // Render the component
//     render(
//         <MantineProvider>
//           <Interface /> 
//         </MantineProvider>
//       );

//     // Simulate user interaction to change skin color and body size
//     // For example, assume there are input fields or selectors for skin color and body size
//     const skinColorInput = screen.getByLabelText('Skin Color'); // Adjust the selector according to your component structure
//     const bodySizeInput = screen.getByLabelText('Body Size'); // Adjust the selector according to your component structure

//     fireEvent.change(skinColorInput, { target: { value: '#ff0000' } }); // Setting skin tone to red (hex value)
//     fireEvent.change(bodySizeInput, { target: { value: 'Body Size 2' } }); // Selecting Body Size 2

//     // Assert that the changes are reflected correctly
//     expect(skinColorInput.value).toBe('#ff0000');
//     expect(bodySizeInput.value).toBe('Body Size 2');

//     // Optionally, verify any visual changes in the rendered component
//     // For example, you can check if the component displays the correct skin color and body size
//     const skinColorDisplay = screen.getByText('#ff0000'); // Assuming the component displays the selected skin color in hex format
//     const bodySizeDisplay = screen.getByText('Body Size 2'); // Assuming the component displays the selected body size

//     expect(skinColorDisplay).toBeInTheDocument();
//     expect(bodySizeDisplay).toBeInTheDocument();

// });

});