import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginModal from './LoginModal';
import { signIn } from 'next-auth/react';
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

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
  
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'test@example.com',
      password: 'password',
    });
  });
});
