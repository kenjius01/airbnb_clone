import React from 'react';
import { render } from '@testing-library/react';
import ClientOnly from '../ClientOnly.tsx';

describe('ClientOnly component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<ClientOnly />);
    const clientOnly = getByTestId('clientOnly');
    expect(clientOnly).toBeInTheDocument();
  });
});
