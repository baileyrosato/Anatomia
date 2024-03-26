import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navigation from './Navigation.js';

const mockCourseData = [
    {
      unit: "Unit 1",
      subunits: [
        { title: "Subunit 1.1" },
        { title: "Subunit 1.2" },
        { title: "Subunit 1.3" },
      ],
    },
    {
      unit: "Unit 2",
      subunits: [
        { title: "Subunit 2.1" },
        { title: "Subunit 2.2" },
        { title: "Subunit 2.3" },
      ],
    },
    // Add more units and subunits as needed
  ];
  
// Mock firebase module
// Manual mock for Firebase
jest.mock('./Database/config.js', () => {
  const firebase = {
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
        once: jest.fn().mockResolvedValue({ val: () => mockCourseData }), // Mock data to return
      })),
    })),
  };

  return { firebase };

});

describe('Navigation Component', () => {
  // Mock useEffect to avoid making actual API calls
  const originalUseEffect = React.useEffect;
  jest.spyOn(React, 'useEffect').mockImplementationOnce(() => {});

  it('fetches course data correctly from the database', async () => {
    const { getByText } = render(<Navigation />);
    await waitFor(() => {
      expect(getByText(/Unit 1/)).toBeInTheDocument();
      expect(getByText(/Unit 2/)).toBeInTheDocument();
      expect(getByText(/Subunit 1.1/)).toBeInTheDocument();
      expect(getByText(/Subunit 2.1/)).toBeInTheDocument();
    });
  });
});