import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';
import { store } from './store';

describe('Redux Store', () => {
  test('should have correct initial state structure', () => {
    const state = store.getState();
    
    expect(state).toHaveProperty('cart');
    expect(state).toHaveProperty('products');
  });

  test('should have cart with initial state', () => {
    const state = store.getState();
    
    expect(state.cart).toEqual({
      items: [],
      isOpen: false,
    });
  });

  test('should have products with initial state', () => {
    const state = store.getState();
    
    expect(state.products).toEqual({
      items: [],
      categories: [],
      selectedCategory: 'all',
      status: 'idle',
      error: null,
      currentProduct: null,
    });
  });

  test('should be configurable with custom reducers', () => {
    const customStore = configureStore({
      reducer: {
        cart: cartReducer,
        products: productsReducer,
      },
    });
    
    expect(customStore.getState()).toBeDefined();
  });
});