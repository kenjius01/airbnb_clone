import React from 'react';
import { render } from '@testing-library/react';
import CategoryBox from '../CategoryBox.tsx';

describe('CategoryBox component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<CategoryBox />);
    const categoryBox = getByTestId('categoryBox');
    expect(categoryBox).toBeInTheDocument();
  });
});
