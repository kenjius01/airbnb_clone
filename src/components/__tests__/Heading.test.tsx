import React from 'react';
import { render } from '@testing-library/react';
import Heading from '../Heading.tsx';

describe('Heading component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Heading />);
    const heading = getByTestId('heading');
    expect(heading).toBeInTheDocument();
  });
});
