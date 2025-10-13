import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import CartItem from './CartItem';
import { renderWithProviders } from '../../__tests__/utils';

const mockCartItem = {
  id: 1,
  title: 'Producto de Prueba',
  price: 100,
  description: 'Descripción de prueba',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 120 },
  quantity: 2,
};

describe('CartItem Component', () => {
  test('renders cart item with correct information', () => {
    renderWithProviders(<CartItem item={mockCartItem} />);
    
    expect(screen.getByText('Producto de Prueba')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('displays correct subtotal', () => {
    renderWithProviders(<CartItem item={mockCartItem} />);
    
    const subtotal = screen.getByText('$200.00');
    expect(subtotal).toBeInTheDocument();
  });

  test('increment button increases quantity', () => {
    const { store } = renderWithProviders(<CartItem item={mockCartItem} />);
    
    const incrementButton = screen.getByLabelText('Incrementar cantidad');
    fireEvent.click(incrementButton);
    
    const state = store.getState();
    const updatedItem = state.cart.items.find(item => item.id === 1);
    expect(updatedItem?.quantity).toBe(3);
  });

  test('decrement button decreases quantity', () => {
    const { store } = renderWithProviders(<CartItem item={mockCartItem} />);
    
    const decrementButton = screen.getByLabelText('Decrementar cantidad');
    fireEvent.click(decrementButton);
    
    const state = store.getState();
    const updatedItem = state.cart.items.find(item => item.id === 1);
    expect(updatedItem?.quantity).toBe(1);
  });

  test('remove button removes item from cart', () => {
    const { store } = renderWithProviders(<CartItem item={mockCartItem} />);
    
    const removeButton = screen.getByLabelText('Eliminar del carrito');
    fireEvent.click(removeButton);
    
    const state = store.getState();
    const removedItem = state.cart.items.find(item => item.id === 1);
    expect(removedItem).toBeUndefined();
  });
});

test('displays quantity correctly', () => {
    renderWithProviders(<CartItem item={mockCartItem} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('truncates long titles', () => {
    const longTitleItem = {
      ...mockCartItem,
      title: 'This is a very long product title that should be truncated after 40 characters'
    };
    renderWithProviders(<CartItem item={longTitleItem} />);
    const title = screen.getByTitle(longTitleItem.title);
    expect(title.textContent).toContain('...');
  });

  test('displays product image', () => {
    renderWithProviders(<CartItem item={mockCartItem} />);
    const image = screen.getByAltText('Producto de Prueba');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test.jpg');
  });