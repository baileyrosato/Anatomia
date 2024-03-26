import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MainMenu from './MainMenu';

// Mock Firebase data
jest.mock('./Database/config.js', () => ({
    firebase: {
      database: () => ({
        ref: jest.fn().mockReturnThis(),
        once: jest.fn().mockResolvedValue({
          val: () => ({
            courseData: [
              { unit: 'Unit 1', subunits: [{ title: 'Subunit 1' }, { title: 'Subunit 2' }] },
              { unit: 'Unit 2', subunits: [{ title: 'Subunit 3' }, { title: 'Subunit 4' }] },
            ],
          }),
        }),
      }),
    },
  }));

  describe('MainMenu Component', () => {
  it('renders main menu units and subunits', async () => {
    const { getByText } = render(<MainMenu />);
    
    // Check if main menu units are rendered
    expect(getByText('Unit 1')).toBeInTheDocument();
    expect(getByText('Unit 2')).toBeInTheDocument();

    // Check if subunits are rendered inside the first unit
    expect(getByText('Subunit 1')).toBeInTheDocument();
    expect(getByText('Subunit 2')).toBeInTheDocument();
  });

  it('expands and collapses units on click', async () => {
    const { getByText, queryByText } = render(<MainMenu />);
    
    // Click on the first unit to expand it
    fireEvent.click(getByText('Unit 1'));
    
    // Check if the subunits are visible
    expect(getByText('Subunit 1')).toBeInTheDocument();
    expect(getByText('Subunit 2')).toBeInTheDocument();
    
    // Click on the first unit again to collapse it
    fireEvent.click(getByText('Unit 1'));

    // Check if the subunits are no longer visible
    expect(queryByText('Subunit 1')).toBeNull();
    expect(queryByText('Subunit 2')).toBeNull();
  });
});