import React from 'react';
import { render, screen } from '@testing-library/react';
import Rating from './Rating';

describe('Rating Component', () => {
  test('renders rating value', () => {
    render(<Rating rate={4.5} count={100} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  test('renders review count', () => {
    render(<Rating rate={4.5} count={100} />);
    expect(screen.getByText('(100 reviews)')).toBeInTheDocument();
  });

  test('renders star icon', () => {
    const { container } = render(<Rating rate={4.5} count={100} />);
    const starIcon = container.querySelector('svg');
    expect(starIcon).toBeInTheDocument();
  });

  test('displays correct rating with decimals', () => {
    render(<Rating rate={3.7} count={50} />);
    expect(screen.getByText('3.7')).toBeInTheDocument();
  });
});