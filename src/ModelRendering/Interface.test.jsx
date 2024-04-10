import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Interface from './Interface.jsx';
import { CharacterCustomizationProvider, useCharacterCustomization } from './CharacterCustomizationContext.jsx';
import { MantineProvider } from '@mantine/core';

jest.mock('./CharacterCustomizationContext.jsx', () => ({
    ...jest.requireActual('./CharacterCustomizationContext.jsx'),
    useCharacterCustomization: jest.fn(),
  }));

const orbitControlsRef = { current: { reset: jest.fn() } }; 

const setHeadConfiguratorOpen = jest.fn();
const setCameraModeMock = jest.fn();
const setMidPlaneVisibleMock = jest.fn();
const setTranversePlaneVisibleMock = jest.fn();
const setParaPlaneVisibleMock = jest.fn();
const setFrontalPlaneVisibleMock = jest.fn();

describe('Interface component tests', () => {
  // test 1
  it('toggles model settings configurator', () => {

    useCharacterCustomization.mockReturnValue({
      headConfiguratorOpen: false,
      setHeadConfiguratorOpen: setHeadConfiguratorOpen,
      setCameraMode: setCameraModeMock,
      setMidPlaneVisible: setMidPlaneVisibleMock,
      setTranversePlaneVisible: setTranversePlaneVisibleMock,
      setParaPlaneVisible: setParaPlaneVisibleMock,
      setFrontalPlaneVisible: setFrontalPlaneVisibleMock,
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

  // test 2
  it('Clicking reset camera button resets camera mode', () => {

    useCharacterCustomization.mockReturnValue({
      headConfiguratorOpen: false,
      setHeadConfiguratorOpen: setHeadConfiguratorOpen,
      setCameraMode: setCameraModeMock,
      setMidPlaneVisible: setMidPlaneVisibleMock,
      setTranversePlaneVisible: setTranversePlaneVisibleMock,
      setParaPlaneVisible: setParaPlaneVisibleMock,
      setFrontalPlaneVisible: setFrontalPlaneVisibleMock,
    });

    const { getByText } = render(
      <CharacterCustomizationProvider>
         <MantineProvider>
            <Interface orbitControlsRef={orbitControlsRef}/>
         </MantineProvider>
      </CharacterCustomizationProvider>
    );

    // Click the "Reset Camera" button
    fireEvent.click(getByText('Reset Camera'));

    // Check if setCameraMode was called with the correct mode
    expect(setCameraModeMock).toHaveBeenCalledWith('HEAD');
  });

  // test 3: stretch goals
  test('Directional buttons and plane controls are rendered based on subunit', () => {
    useCharacterCustomization.mockReturnValue({
      headConfiguratorOpen: false,
      setHeadConfiguratorOpen: setHeadConfiguratorOpen,
      setCameraMode: setCameraModeMock,
      setMidPlaneVisible: setMidPlaneVisibleMock,
      setTranversePlaneVisible: setTranversePlaneVisibleMock,
      setParaPlaneVisible: setParaPlaneVisibleMock,
      setFrontalPlaneVisible: setFrontalPlaneVisibleMock,
    });

    const { getByTestId, rerender } = render(
      <CharacterCustomizationProvider>
      <MantineProvider>
         <Interface subunit = "Directional Terms" orbitControlsRef={orbitControlsRef}/>
      </MantineProvider>
   </CharacterCustomizationProvider>
    );
  
    const directionalButtons = getByTestId('directional-buttons');
    expect(directionalButtons).toBeInTheDocument();
  
    // Rerender with a different subunit prop
    rerender(
      <CharacterCustomizationProvider>
        <MantineProvider>
         <Interface subunit = "Planes of Sectioning" orbitControlsRef={orbitControlsRef}/>
      </MantineProvider>
      </CharacterCustomizationProvider>
    );
  
    const planesButtons = getByTestId('plane-buttons');
    expect(planesButtons).toBeInTheDocument();

    // Rerender with a different subunit prop
    rerender(
      <CharacterCustomizationProvider>
        <MantineProvider>
         <Interface subunit = "Other Subunit" orbitControlsRef={orbitControlsRef}/>
      </MantineProvider>
      </CharacterCustomizationProvider>
    );

    expect(directionalButtons).not.toBeInTheDocument();
    expect(planesButtons).not.toBeInTheDocument();
  });
 });
