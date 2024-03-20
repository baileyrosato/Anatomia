import React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import MainMenu from './MainMenu.js';
import {firebase} from './Database/config.js';

// jest.mock('./Database/config.js', () => ({
//     firebase: {
//       database: jest.fn(() => ({
//         ref: jest.fn(() => ({
//             once: jest.fn().mockResolvedValue({
//             val: () => ({
//                 courseData: [
//                     { unit: 'Unit 1', subunits: [{ title: 'Subunit 1' }] },
//                     { unit: 'Unit 2', subunits: [{ title: 'Subunit 1' }, { title: 'Subunit 2' }] },
//                   ],
//                 }),
//               }),
//             })),
//           })),
//         },
//       }));
  
  describe('MainMenu', () => {

    // // test 1
    // it('fetches course data correctly from the database', async () => {
    //   const { findByText } = render(<MainMenu />);
    //   // Wait for data fetching to complete
    // await waitFor(() => {
    //     expect(firebase.database().ref().once).toHaveBeenCalledTimes(1);
    //   });

    //   expect(getByText('Unit 1')).toBeInTheDocument();
    //   expect(await findByText('Subunit 1')).toBeInTheDocument();
    //   expect(await findByText('Unit 2')).toBeInTheDocument();
    //   expect(await findByText('Subunit 2')).toBeInTheDocument();
    // });

    // test 2
    it('should expand and collapse units correctly', () => {
        // Render the MainMenu component
        const { getByText, queryByText } = render(<MainMenu />);
        
        // Find a unit that can be expanded/collapsed
        const unitToToggle = getByText('Unit 1');
        expect(unitToToggle).toBeInTheDocument();
    
        // Initially, the unit should not be expanded
        expect(queryByText('Subunit 1')).not.toBeInTheDocument();
    
        // Click on the unit to expand it
        fireEvent.click(unitToToggle);
    
        // After clicking, the subunit should be visible
        expect(getByText('Subunit 1')).toBeInTheDocument();
    
        // Click on the unit again to collapse it
        fireEvent.click(unitToToggle);
    
        // After clicking again, the subunit should not be visible
        expect(queryByText('Subunit 1')).not.toBeInTheDocument();
      });
  });  