import React from 'react';
import { render } from '@testing-library/react';
import Button from '../Button.tsx';

describe('Button component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Button />);
    const button = getByTestId('button');
    expect(button).toBeInTheDocument();
  });
});
