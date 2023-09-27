import React from 'react';
import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  test('renders Container component without crashing', () => {
    render(<Container />);
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });

  test('renders its children', () => {
    render(
      <Container>
        <div data-testid="child">Child</div>
      </Container>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
