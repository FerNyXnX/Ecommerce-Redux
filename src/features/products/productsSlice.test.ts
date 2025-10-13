import productsReducer, { 
  setSelectedCategory, 
  clearError,
  clearCurrentProduct,
  fetchProducts,
  fetchCategories,
  fetchProductById
} from './productsSlice';
import { configureStore } from '@reduxjs/toolkit';
import ProductsAPI from '../../services/api';

jest.mock('../../services/api');

describe('productsSlice', () => {
  test('should return initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
      categories: [],
      selectedCategory: 'all',
      status: 'idle',
      error: null,
      currentProduct: null,
    });
  });

  test('should set selected category', () => {
    const actual = productsReducer(undefined, setSelectedCategory('electronics'));
    expect(actual.selectedCategory).toBe('electronics');
  });

  test('should change from one category to another', () => {
    const initialState = {
      items: [],
      categories: [],
      selectedCategory: 'electronics',
      status: 'idle' as const,
      error: null,
      currentProduct: null,
    };
    const actual = productsReducer(initialState, setSelectedCategory('jewelery'));
    expect(actual.selectedCategory).toBe('jewelery');
  });

  test('should clear error', () => {
    const initialState = {
      items: [],
      categories: [],
      selectedCategory: 'all',
      status: 'failed' as const,
      error: 'Some error',
      currentProduct: null,
    };
    const actual = productsReducer(initialState, clearError());
    expect(actual.error).toBeNull();
    expect(actual.status).toBe('idle');
  });

  test('should clear current product', () => {
    const initialState = {
      items: [],
      categories: [],
      selectedCategory: 'all',
      status: 'idle' as const,
      error: null,
      currentProduct: {
        id: 1,
        title: 'Test',
        price: 100,
        description: 'Test',
        category: 'test',
        image: 'test.jpg',
        rating: { rate: 4, count: 10 }
      },
    };
    const actual = productsReducer(initialState, clearCurrentProduct());
    expect(actual.currentProduct).toBeNull();
  });

  // Tests async thunks
  describe('fetchProducts', () => {
    test('should handle pending state', () => {
      const action = { type: fetchProducts.pending.type };
      const state = productsReducer(undefined, action);
      expect(state.status).toBe('loading');
      expect(state.error).toBeNull();
    });

    test('should handle fulfilled state', () => {
      const mockProducts = [
        { id: 1, title: 'Product', price: 100, description: 'Desc', category: 'test', image: 'img.jpg', rating: { rate: 4, count: 10 } }
      ];
      const action = { type: fetchProducts.fulfilled.type, payload: mockProducts };
      const state = productsReducer(undefined, action);
      expect(state.status).toBe('succeeded');
      expect(state.items).toEqual(mockProducts);
    });

    test('should handle rejected state', () => {
      const action = { type: fetchProducts.rejected.type, error: { message: 'Error' } };
      const state = productsReducer(undefined, action);
      expect(state.status).toBe('failed');
      expect(state.error).toBe('Error');
    });
  });

  describe('fetchCategories', () => {
    test('should handle fulfilled state', () => {
      const mockCategories = ['electronics', 'jewelery'];
      const action = { type: fetchCategories.fulfilled.type, payload: mockCategories };
      const state = productsReducer(undefined, action);
      expect(state.categories).toEqual(['all', ...mockCategories]);
    });

    test('should handle rejected state', () => {
      const action = { type: fetchCategories.rejected.type, error: { message: 'Error loading categories' } };
      const state = productsReducer(undefined, action);
      expect(state.error).toBe('Error loading categories');
    });
  });

  describe('fetchProductById', () => {
    test('should handle pending state', () => {
      const action = { type: fetchProductById.pending.type };
      const state = productsReducer(undefined, action);
      expect(state.currentProduct).toBeNull();
    });

    test('should handle fulfilled state', () => {
      const mockProduct = { id: 1, title: 'Product', price: 100, description: 'Desc', category: 'test', image: 'img.jpg', rating: { rate: 4, count: 10 } };
      const action = { type: fetchProductById.fulfilled.type, payload: mockProduct };
      const state = productsReducer(undefined, action);
      expect(state.currentProduct).toEqual(mockProduct);
    });

    test('should handle rejected state', () => {
      const action = { type: fetchProductById.rejected.type, error: { message: 'Product not found' } };
      const state = productsReducer(undefined, action);
      expect(state.error).toBe('Product not found');
    });
  });
});