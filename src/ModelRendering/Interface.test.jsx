import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Interface from './Interface.jsx';
import { CharacterCustomizationProvider, useCharacterCustomization } from './CharacterCustomizationContext.jsx';
import { MantineProvider } from '@mantine/core';

jest.mock('./CharacterCustomizationContext.jsx', () => ({
    ...jest.requireActual('./CharacterCustomizationContext.jsx'),
    useCharacterCustomization: jest.fn(),
  }));

describe('Interface component tests', () => {
it('toggles model settings configurator', () => {
    const orbitControlsRef = { current: { reset: jest.fn() } }; // Mocked ref object
    const setHeadConfiguratorOpen = jest.fn();

    // Mock useCharacterCustomization hook
    useCharacterCustomization.mockReturnValue({
        headConfiguratorOpen: false,
        setHeadConfiguratorOpen: setHeadConfiguratorOpen,
        setCameraMode: jest.fn(),
        setMidPlaneVisible: jest.fn(),
        // TODO: set all planes
      });

    // Render the Interface component
    const { getByText } = render(
        <CharacterCustomizationProvider>
            <MantineProvider>
                <Interface orbitControlsRef={orbitControlsRef}/>
            </MantineProvider>
        </CharacterCustomizationProvider>
      );
       // Click the "Model Settings" button
    fireEvent.click(getByText('Model Settings'));

    // Check if setHeadConfiguratorOpen was called with the opposite value
    expect(setHeadConfiguratorOpen).toHaveBeenCalledWith(true);
  });


//   test('Clicking reset camera button resets camera mode', () => {
//     const setCameraModeMock = jest.fn();

//     // Mock the state and functions
//     useCharacterCustomization.mockReturnValue({
//       setCameraMode: setCameraModeMock,
//     });

//     const { getByText } = render(
//       <CharacterCustomizationProvider>
//         <Interface />
//       </CharacterCustomizationProvider>
//     );

//     // Click the "Reset Camera" button
//     fireEvent.click(getByText('Reset Camera'));

//     // Check if setCameraMode was called with the correct mode
//     expect(setCameraModeMock).toHaveBeenCalledWith('HEAD');
//   });

//   test('Clicking export model button triggers export function', () => {
//     global.html2canvas = jest.fn(() =>
//       Promise.resolve({
//         toDataURL: jest.fn(() => 'data:image/png;base64,...'),
//       })
//     );

//     const { getByText } = render(
//       <CharacterCustomizationProvider>
//         <Interface />
//       </CharacterCustomizationProvider>
//     );

//     // Click the "Export Model" button
//     fireEvent.click(getByText('Export Model'));

//     // Check if html2canvas function was called
//     expect(global.html2canvas).toHaveBeenCalled();
//   });
//   test('Directional buttons and plane controls are rendered based on subunit', () => {
//     // Mock the subunit prop to test different scenarios
//     const { getByText, queryByText, rerender } = render(
//       <CharacterCustomizationProvider>
//         <Interface subunit="Directional Terms" />
//       </CharacterCustomizationProvider>
//     );
  
//     // Check if directional buttons are rendered
//     expect(getByText('Directional Button 1')).toBeInTheDocument();
//     expect(getByText('Directional Button 2')).toBeInTheDocument();
  
//     // Check if plane controls are not rendered
//     expect(queryByText('Plane Controls')).not.toBeInTheDocument();
  
//     // Rerender with a different subunit prop
//     rerender(
//       <CharacterCustomizationProvider>
//         <Interface subunit="Planes of Sectioning" />
//       </CharacterCustomizationProvider>
//     );
  
//     // Check if plane controls are rendered
//     expect(getByText('Plane Controls')).toBeInTheDocument();
  
//     // Check if directional buttons are not rendered
//     expect(queryByText('Directional Button 1')).not.toBeInTheDocument();
//     expect(queryByText('Directional Button 2')).not.toBeInTheDocument();
//   });
 });
