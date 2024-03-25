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
  
  // test 2
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