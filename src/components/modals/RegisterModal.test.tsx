import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RegisterModal from './RegisterModal';
import axios from 'axios';
jest.mock('axios');

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

    expect(axios.post).toHaveBeenCalledWith('/api/auth/register', {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    });
  });
});
