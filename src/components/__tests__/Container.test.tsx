import React from 'react';
import { render } from '@testing-library/react';
import Container from '../Container.tsx';

describe('Container component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Container />);
    const container = getByTestId('container');
    expect(container).toBeInTheDocument();
  });
});
