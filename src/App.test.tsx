import React from 'react';
import { screen } from '@testing-library/react';
import App from './App';
import { renderWithProviders } from './__tests__/utils';

describe('App Component', () => {
  test('renders header with title', () => {
    renderWithProviders(<App />);
    const headerElement = screen.getByText(/Mi Tienda/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders product list', () => {
    renderWithProviders(<App />);
    const productSection = screen.getByRole('main');
    expect(productSection).toBeInTheDocument();
  });

  test('renders footer', () => {
    renderWithProviders(<App />);
    const footer = screen.getByText(/Desarrollado con React & Redux Toolkit/i);
    expect(footer).toBeInTheDocument();
  });
});