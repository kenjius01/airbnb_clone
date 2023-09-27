import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterModal from './RegisterModal';

describe('RegisterModal', () => {
  test('renders RegisterModal component without crashing', () => {
    render(<RegisterModal />);
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  test('allows the user to register successfully', async () => {
    render(<RegisterModal />);

    userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/name/i), 'Test User');
    userEvent.type(screen.getByLabelText(/password/i), 'password');

    userEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Add assertion to check the expected outcome
  });

  test('shows validation error when input is invalid', async () => {
    render(<RegisterModal />);

    userEvent.type(screen.getByLabelText(/email/i), 'invalid email');
    userEvent.type(screen.getByLabelText(/name/i), '');
    userEvent.type(screen.getByLabelText(/password/i), '');

    userEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Add assertion to check if the appropriate error messages are displayed
  });
});
