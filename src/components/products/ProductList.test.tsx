import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import ProductList from './ProductList';
import { renderWithProviders } from '../../__tests__/utils';
import ProductsAPI from '../../services/api';

jest.mock('../../services/api');

const mockProducts = [
  {
    id: 1,
    title: 'Producto 1',
    price: 100,
    description: 'Descripción 1',
    category: 'electronics',
    image: 'img1.jpg',
    rating: { rate: 4.5, count: 100 },
  },
  {
    id: 2,
    title: 'Producto 2',
    price: 200,
    description: 'Descripción 2',
    category: 'jewelery',
    image: 'img2.jpg',
    rating: { rate: 3.5, count: 50 },
  },
];

describe('ProductList Component', () => {
  beforeEach(() => {
    (ProductsAPI.fetchAllProducts as jest.Mock).mockResolvedValue(mockProducts);
    (ProductsAPI.fetchCategories as jest.Mock).mockResolvedValue(['electronics', 'jewelery']);
  });

  test('displays loading state initially', () => {
    renderWithProviders(<ProductList />);
    const loadingSpinner = document.querySelector('.animate-spin');
    expect(loadingSpinner).toBeInTheDocument();
  });

  test('renders products after loading', async () => {
    renderWithProviders(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText('Producto 1')).toBeInTheDocument();
      expect(screen.getByText('Producto 2')).toBeInTheDocument();
    });
  });

  test('displays error message on fetch failure', async () => {
    (ProductsAPI.fetchAllProducts as jest.Mock).mockRejectedValue(
      new Error('Error al cargar productos: Network error')
    );

    renderWithProviders(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/Error al cargar productos/i)).toBeInTheDocument();
    });
  });

  test('fetches products on mount', async () => {
    renderWithProviders(<ProductList />);

    await waitFor(() => {
      expect(ProductsAPI.fetchAllProducts).toHaveBeenCalledTimes(1);
    });
  });

  test('fetches categories on mount', async () => {
    renderWithProviders(<ProductList />);

    await waitFor(() => {
      expect(ProductsAPI.fetchCategories).toHaveBeenCalledTimes(1);
    });
  });
});