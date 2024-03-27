import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SettingsConfigurator } from './SettingsConfigurator';

describe('SettingsConfigurator Component', () => {
  it('updates skin color correctly', () => {

    const { getByLabelText } = render(<SettingsConfigurator />);
    const colorInput = getByLabelText('Skin Tone:');

    // test with valid hexadecimal color input
    fireEvent.change(colorInput, { target: { value: '#abcdef' } });
    expect(colorInput).toHaveValue('#abcdef');

    // test with invalid hexadecimal color input
    fireEvent.change(colorInput, { target: { value: 'invalid' } });
    expect(colorInput).toHaveValue(''); // expect value to be cleared for invalid input
  });

  it('updates biological sex correctly', () => {

    const { getByLabelText } = render(<SettingsConfigurator />);
    const genderSwitch = getByLabelText('Biological Sex:');

    // test toggling from male to female
    fireEvent.click(genderSwitch);
    expect(genderSwitch).toHaveAttribute('aria-checked', 'true');

    // test toggling from female to male
    fireEvent.click(genderSwitch);
    expect(genderSwitch).toHaveAttribute('aria-checked', 'false');
  });

  it('updates body size correctly', () => {
    
    const { getByLabelText, getByText } = render(<SettingsConfigurator />);
    const bodySizeSelect = getByLabelText('Body Size:');

    // test selecting a valid body size option
    fireEvent.change(bodySizeSelect, { target: { value: '5' } });
    expect(getByText('Body 5')).toBeInTheDocument();
  });
});