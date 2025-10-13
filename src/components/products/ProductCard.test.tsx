import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { renderWithProviders } from '../../__tests__/utils';

const mockProduct = {
  id: 1,
  title: 'Producto de Prueba',
  price: 100,
  description: 'Esta es una descripción de prueba del producto',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 120,
  },
};

describe('ProductCard Component', () => {
  test('renders product information correctly', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Producto de Prueba')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  test('renders product image with correct alt text', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText('Producto de Prueba');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('renders rating component', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);

    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(120 reviews)')).toBeInTheDocument();
  });

  test('adds product to cart when button is clicked', () => {
    const { store } = renderWithProviders(<ProductCard product={mockProduct} />);

    const addButton = screen.getByText('Agregar al Carrito');
    fireEvent.click(addButton);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].id).toBe(1);
  });

  test('truncates long description', () => {
    const longDescription = 'a'.repeat(200);
    const productWithLongDesc = { ...mockProduct, description: longDescription };

    renderWithProviders(<ProductCard product={productWithLongDesc} />);

    const description = screen.getByText(/aaa/);
    expect(description.textContent?.length).toBeLessThan(200);
  });
});