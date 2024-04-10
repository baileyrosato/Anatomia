import React from 'react';
import { render, fireEvent, getByTestId, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { SettingsConfigurator } from './SettingsConfigurator.jsx';
import { MantineProvider } from '@mantine/core';
import { useCharacterCustomization } from './CharacterCustomizationContext.jsx';

jest.mock('./CharacterCustomizationContext.jsx', () => ({
  ...jest.requireActual('./CharacterCustomizationContext.jsx'),
  useCharacterCustomization: jest.fn(),
}));

const setSkinColorMock = jest.fn();
const setGenderMock = jest.fn();
const setBodySizeMock = jest.fn();

describe('SettingsConfigurator Component', () => {
  it('updates skin color correctly', () => {
    useCharacterCustomization.mockReturnValue({
      setSkinColor: setSkinColorMock
    });

    const { getByTestId } = render(
    <MantineProvider>
       <SettingsConfigurator/>
    </MantineProvider>
   );
    const colorInput = getByTestId('skin-tone-input');

    // test with valid hexadecimal color input
    fireEvent.change(colorInput, { target: { value: '#abcdef' } });
    expect(setSkinColorMock).toHaveBeenCalledWith('#abcdef');

    // Fire the change event with an invalid hexadecimal color input
    fireEvent.change(colorInput, { target: { value: 'invalid' } });
    expect(setSkinColorMock).toHaveBeenCalledWith('');
  });

  // it('updates biological sex correctly', () => {
  //   useCharacterCustomization.mockReturnValue({
  //     setGender: setGenderMock,
  //   });

  //   const { getByTestId } = render(
  //   <MantineProvider>
  //     <SettingsConfigurator/>
  //   </MantineProvider>);
  //   const genderSwitch = getByTestId('gender-switch');

  //   // test toggling from male to female
  //   fireEvent.click(genderSwitch);
  //   expect(setGenderMock).toHaveBeenCalledWith('male');

  //   // test toggling from female to male
  //   fireEvent.click(genderSwitch);
  //   expect(setGenderMock).toHaveBeenCalledWith('female');
  // });

  // it('updates body size correctly', () => {
  //   useCharacterCustomization.mockReturnValue({
  //     setBodySize: setBodySizeMock,
  //   });
    
  //   const { getByTestId } = render(
  //   <MantineProvider>
  //     <SettingsConfigurator/>
  //   </MantineProvider>);

  //   const bodySizeDropdown = getByTestId('body-size-dropdown');

  //   // Get all the options within the Select component
  //   const options = Array.from(bodySizeDropdown.getElementsByTagName('option')).map(option => option.value);

  //   // Log the options to inspect them
  //   console.log('Options:', options);

  //   // Assert that the option with value '5' is present
  //   expect(options).toContain('5');
  
  // });
});