import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginModal from './LoginModal';

describe('LoginModal', () => {
  test('renders LoginModal component without crashing', () => {
    render(<LoginModal />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('allows the user to login successfully', async () => {
    render(<LoginModal />);

    userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password');

    userEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Add assertion to check the expected outcome
  });

  test('shows validation error when input is invalid', async () => {
    render(<LoginModal />);

    userEvent.type(screen.getByLabelText(/email/i), 'invalid email');
    userEvent.type(screen.getByLabelText(/password/i), '');

    userEvent.click(screen.getByRole('button', { name: /continue/i }));

    // Add assertion to check if the appropriate error messages are displayed
  });
});
