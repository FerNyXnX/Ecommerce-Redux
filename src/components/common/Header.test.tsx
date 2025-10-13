import React from 'react';
import { screen } from '@testing-library/react';
import Header from './Header';
import { renderWithProviders } from '../../__tests__/utils';
import { CartItem } from '../../types';

describe('Header Component', () => {
  test('renders store title', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Mi Tienda')).toBeInTheDocument();
  });

  test('displays correct item count when cart is empty', () => {
    renderWithProviders(<Header />, {
      preloadedState: {
        cart: {
            items: [],
            isOpen: false
        },
        products: {
            items: [],
            categories: [],
            selectedCategory: 'all',
            status: 'idle',
            error: null,
            currentProduct: null
        },
      },
    });
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('displays correct item count when cart has items', () => {
    const mockCartItem: CartItem = {
      id: 1,
      title: 'Producto 1',
      price: 100,
      description: 'Desc',
      category: 'electronics',
      image: 'img.jpg',
      rating: { rate: 4, count: 10 },
      quantity: 3,
    };

    renderWithProviders(<Header />, {
      preloadedState: {
        cart: {
            items: [mockCartItem],
            isOpen: false
        },
        products: {
            items: [],
            categories: [],
            selectedCategory: 'all',
            status: 'idle',
            error: null,
            currentProduct: null
        },
      },
    });
    
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('renders shopping cart icon', () => {
    renderWithProviders(<Header />);
    const cartIcon = screen.getByLabelText(/carrito de compras/i);
    expect(cartIcon).toBeInTheDocument();
  });
});