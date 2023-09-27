import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginModal from './LoginModal';

describe('LoginModal', () => {
  it('renders without crashing', () => {
    const { container } = render(<LoginModal />);
    expect(container).toBeInTheDocument();
  });

  it('handles form submission correctly', () => {
    const { getByLabelText, getByText } = render(<LoginModal />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Continue');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    // Here, you would check if the expected callbacks are called with the correct arguments.
    // This depends on your implementation and might require mocking functions or checking the state.
  });
});
