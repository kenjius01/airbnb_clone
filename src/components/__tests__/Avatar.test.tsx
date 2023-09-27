import React from 'react';
import { render } from '@testing-library/react';
import Avatar from '../Avatar.tsx';

describe('Avatar component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<Avatar />);
    const avatar = getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
  });
});
