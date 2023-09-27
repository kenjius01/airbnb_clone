import React from 'react';
import { render } from '@testing-library/react';
import EmptyState from '../EmptyState.tsx';

describe('EmptyState component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<EmptyState />);
    const emptyState = getByTestId('emptyState');
    expect(emptyState).toBeInTheDocument();
  });
});
