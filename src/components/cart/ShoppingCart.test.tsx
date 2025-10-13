import React from 'react';
import { screen } from '@testing-library/react';
import ShoppingCart from './ShoppingCart';
import { renderWithProviders } from '../../__tests__/utils';
import { CartItem } from '../../types';

describe('ShoppingCart Component', () => {
  test('renders empty cart message when cart is empty', () => {
    renderWithProviders(<ShoppingCart />, {
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
    
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  test('renders cart items when cart has products', () => {
    const mockCartItem: CartItem = {
      id: 1,
      title: 'Producto 1',
      price: 100,
      description: 'Desc',
      category: 'electronics',
      image: 'img.jpg',
      rating: { rate: 4, count: 10 },
      quantity: 2,
    };

    renderWithProviders(<ShoppingCart />, {
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
    
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });

  test('displays correct total', () => {
    const mockItems: CartItem[] = [
      {
        id: 1,
        title: 'Producto 1',
        price: 100,
        description: 'Desc',
        category: 'electronics',
        image: 'img.jpg',
        rating: { rate: 4, count: 10 },
        quantity: 2,
      },
      {
        id: 2,
        title: 'Producto 2',
        price: 50,
        description: 'Desc',
        category: 'jewelery',
        image: 'img.jpg',
        rating: { rate: 3, count: 5 },
        quantity: 1,
      },
    ];

    renderWithProviders(<ShoppingCart />, {
      preloadedState: {
        cart: {
            items: mockItems,
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
    
    expect(screen.getByText('$250.00')).toBeInTheDocument();
  });
});