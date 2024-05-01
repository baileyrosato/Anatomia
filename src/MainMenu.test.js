import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import MainMenu from './MainMenu';
import { firebase } from './Database/config';

jest.mock('./Database/config', () => ({
    firebase: {
      database: () => ({
        ref: jest.fn().mockReturnThis(),
        once: jest.fn().mockResolvedValue({
          val: jest.fn().mockReturnValue({
            unit1: {
              unit: 'Unit 1',
              subunits: [{ title: 'Subunit 1' }, { title: 'Subunit 2' }]
            },
            unit2: {
              unit: 'Unit 2',
              subunits: [{ title: 'Subunit 1' }, { title: 'Subunit 2' }]
            }
          })
        })
      })
    }
  }));

describe('MainMenu component', () => {
  it('renders without crashing', () => {
    render(<MainMenu />);
  });
});