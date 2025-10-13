import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';
import { renderWithProviders } from '../../__tests__/utils';

describe('CategoryFilter Component', () => {
  const mockCategories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

  test('renders all category buttons', () => {
    renderWithProviders(<CategoryFilter />, {
      preloadedState: {
        cart: {
            items: [],
            isOpen: false
        },
        products: {
            items: [],
            categories: mockCategories,
            selectedCategory: 'all',
            status: 'idle',
            error: null,
            currentProduct: null
        },
      },
    });

    expect(screen.getByText('Todas')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Jewelery')).toBeInTheDocument();
    expect(screen.getByText("Men's Clothing")).toBeInTheDocument();
    expect(screen.getByText("Women's Clothing")).toBeInTheDocument();
  });

  test('changes selected category when button is clicked', () => {
    const { store } = renderWithProviders(<CategoryFilter />, {
      preloadedState: {
        cart: {
            items: [],
            isOpen: false
        },
        products: {
            items: [],
            categories: mockCategories,
            selectedCategory: 'all',
            status: 'idle',
            error: null,
            currentProduct: null
        },
      },
    });

    const electronicsButton = screen.getByText('Electronics');
    fireEvent.click(electronicsButton);

    const state = store.getState();
    expect(state.products.selectedCategory).toBe('electronics');
  });

  test('highlights selected category', () => {
    renderWithProviders(<CategoryFilter />, {
      preloadedState: {
        cart: {
            items: [],
            isOpen: false
        },
        products: {
            items: [],
            categories: mockCategories,
            selectedCategory: 'electronics',
            status: 'idle',
            error: null,
            currentProduct: null
        },
      },
    });

    const electronicsButton = screen.getByText('Electronics');
    expect(electronicsButton).toHaveClass('bg-blue-500');
  });
});