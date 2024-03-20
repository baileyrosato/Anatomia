// to run tests: 'npm test'

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import CourseEntry from "./CourseEntry.js";
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CourseEntry Component', () => {

  // test 1
  it('should update courseCode state correctly when input changes', () => {
    const { getByTestId } = render(<CourseEntry />, { wrapper: MemoryRouter });
    const input = getByTestId('courseCode-input');
    fireEvent.change(input, { target: { value: 'BIO201'} }); 
    expect(input.value).toBe('BIO201');
  });

  // TODO: test 2
  //   it('should navigate to MainMenu upon successful form submission', async () => {
  //     const navigateMock = jest.fn();
  //     require('react-router-dom').useNavigate.mockReturnValue(navigateMock);
    
  //     const { getByTestId, getByText, debug } = render(<CourseEntry />, { wrapper: MemoryRouter });
  //     debug();
  //     const input = getByTestId('courseCode');
  //     const submitButton = getByText('Submit');
      
  //     input.dispatchEvent(new Event('change', { target: { value: 'BIO201' } }));
  //     fireEvent.click(submitButton);
  
  //     await act(async () => {
  //       expect(navigateMock).toHaveBeenCalledWith('/MainMenu');
  //     });
  //   });
  
  // test 3
  it('should show error alert for incorrect course code', () => {
    const { getByTestId, getByText } = render(<CourseEntry />, { wrapper: MemoryRouter });
    const input = getByTestId('courseCode-input');
    const submitButton = getByText('Submit');

    fireEvent.change(input, { target: { value: '123456' } });
    fireEvent.click(submitButton);

    const alert = getByText('Incorrect course code. Please try again.');
    expect(alert).toBeInTheDocument();
  });
});