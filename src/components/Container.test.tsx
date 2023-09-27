import React from 'react';
import { render } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('renders without crashing', () => {
    const { container } = render(<Container />);
    expect(container).toBeInTheDocument();
  });

  it('renders its children correctly', () => {
    const { getByText } = render(
      <Container>
        <div>Test Child</div>
      </Container>
    );
    const child = getByText('Test Child');
    expect(child).toBeInTheDocument();
  });
});
