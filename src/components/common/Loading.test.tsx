import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner, ProductSkeleton, ErrorMessage } from './Loading';

describe('Loading Components', () => {
  describe('LoadingSpinner', () => {
    test('renders loading spinner with default size', () => {
      const { container } = render(<LoadingSpinner />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('h-12', 'w-12');
    });

    test('renders loading spinner with small size', () => {
      const { container } = render(<LoadingSpinner size="small" />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('h-6', 'w-6');
    });

    test('renders loading spinner with large size', () => {
      const { container } = render(<LoadingSpinner size="large" />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('h-16', 'w-16');
    });
  });

  describe('ProductSkeleton', () => {
    test('renders product skeleton with animation', () => {
      const { container } = render(<ProductSkeleton />);
      const skeleton = container.querySelector('.animate-pulse');
      expect(skeleton).toBeInTheDocument();
    });

    test('has correct structure', () => {
      const { container } = render(<ProductSkeleton />);
      const skeleton = container.querySelector('.bg-white');
      expect(skeleton).toHaveClass('rounded-lg', 'shadow-md', 'p-6');
    });
  });

  describe('ErrorMessage', () => {
    test('displays error message', () => {
      render(<ErrorMessage message="Test error message" />);
      expect(screen.getByText('Test error message')).toBeInTheDocument();
      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    test('renders retry button when onRetry is provided', () => {
      const mockRetry = jest.fn();
      render(<ErrorMessage message="Error" onRetry={mockRetry} />);
      
      const retryButton = screen.getByText('Reintentar');
      expect(retryButton).toBeInTheDocument();
    });

    test('does not render retry button when onRetry is not provided', () => {
      render(<ErrorMessage message="Error" />);
      
      const retryButton = screen.queryByText('Reintentar');
      expect(retryButton).not.toBeInTheDocument();
    });

    test('calls onRetry when retry button is clicked', () => {
      const mockRetry = jest.fn();
      render(<ErrorMessage message="Error" onRetry={mockRetry} />);
      
      const retryButton = screen.getByText('Reintentar');
      retryButton.click();
      
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });
  });
});