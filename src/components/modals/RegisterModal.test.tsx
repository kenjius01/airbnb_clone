import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RegisterModal from './RegisterModal';

describe('RegisterModal', () => {
  it('renders without crashing', () => {
    const { container } = render(<RegisterModal />);
    expect(container).toBeInTheDocument();
  });

  it('handles form submission correctly', () => {
    const { getByLabelText, getByText } = render(<RegisterModal />);
    const emailInput = getByLabelText('Email');
    const nameInput = getByLabelText('Name');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Continue');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    // Here, you would check if the expected callbacks are called with the correct arguments.
    // This depends on your implementation and might require mocking functions or checking the state.
  });
});
