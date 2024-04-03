import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this to extend jest matchers
import UserGuide from './UserGuide.js';

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
  ];

// manual mock for Firebase
jest.mock('./Database/config.js', () => {
    const firebase = {
      database: jest.fn(() => ({
        ref: jest.fn(() => ({
          once: jest.fn().mockResolvedValue({ val: () => mockCourseData }), // mock data to return
        })),
      })),
    };
  
    return { firebase };

});

describe('UserGuide Component', () => {
  // test one
  it('should render user guide content correctly', () => {
    const { getByText } = render(<UserGuide />);
    
    expect(getByText('User Guide')).toBeInTheDocument();
    expect(getByText(/Welcome to the Anatomia User Guide!/)).toBeInTheDocument();
    expect(getByText(/Click the button below to view and download the user guide./)).toBeInTheDocument();
    expect(getByText('About The Developers')).toBeInTheDocument();
  });
  });