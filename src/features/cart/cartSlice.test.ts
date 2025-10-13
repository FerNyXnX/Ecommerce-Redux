import cartReducer, { 
  addToCart, 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity,
  updateQuantity,
  clearCart,
  closeCart,
  toggleCart,
  CartState,
  selectCartTotal,
  selectCartItemsCount,
  selectCartItemById
} from './cartSlice';
import { Product } from '../../types';
import { RootState } from '../../app/store';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 100,
  description: 'Test Description',
  category: 'electronics',
  image: 'test.jpg',
  rating: { rate: 4.5, count: 100 },
};

describe('cartSlice', () => {
  test('should return initial state', () => {
    const initialState: CartState = { items: [], isOpen: false };
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should add product to cart', () => {
    const initialState: CartState = { items: [], isOpen: false };
    const actual = cartReducer(initialState, addToCart(mockProduct));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(1);
  });

  test('should increment quantity if product already exists', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 1 }],
      isOpen: false,
    };
    const actual = cartReducer(initialState, addToCart(mockProduct));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(2);
  });

  test('should remove product from cart', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 1 }],
      isOpen: false,
    };
    const actual = cartReducer(initialState, removeFromCart(1));
    expect(actual.items).toHaveLength(0);
  });

  test('should increment product quantity', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 1 }],
      isOpen: false,
    };
    const actual = cartReducer(initialState, incrementQuantity(1));
    expect(actual.items[0].quantity).toBe(2);
  });

  test('should decrement product quantity', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 2 }],
      isOpen: false,
    };
    const actual = cartReducer(initialState, decrementQuantity(1));
    expect(actual.items[0].quantity).toBe(1);
  });

  test('should not decrement below 1', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 1 }],
      isOpen: false,
    };
    const actual = cartReducer(initialState, decrementQuantity(1));
    expect(actual.items[0].quantity).toBe(1);
  });

  test('should update quantity directly', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 1 }],
      isOpen: false,
    };
    const actual = cartReducer(initialState, updateQuantity({ id: 1, quantity: 5 }));
    expect(actual.items[0].quantity).toBe(5);
  });

  test('should clear cart', () => {
    const initialState: CartState = {
      items: [{ ...mockProduct, quantity: 1 }],
      isOpen: false,
    };
    const actual = cartReducer(initialState, clearCart());
    expect(actual.items).toHaveLength(0);
  });

  test('should toggle cart', () => {
    const initialState: CartState = {
      items: [],
      isOpen: false,
    };
    const actual = cartReducer(initialState, toggleCart());
    expect(actual.isOpen).toBe(true);
  });

  test('should close cart', () => {
    const initialState: CartState = {
      items: [],
      isOpen: true,
    };
    const actual = cartReducer(initialState, closeCart());
    expect(actual.isOpen).toBe(false);
  });

  describe('Selectors', () => {
    const mockState: RootState = {
      cart: {
        items: [
          { ...mockProduct, quantity: 2 },
          { ...mockProduct, id: 2, price: 50, quantity: 1 },
        ],
        isOpen: true,
      },
      products: {
        items: [],
        categories: [],
        selectedCategory: 'all',
        status: 'idle',
        error: null,
        currentProduct: null,
      },
    };

    test('selectCartTotal should calculate total correctly', () => {
      expect(selectCartTotal(mockState)).toBe(250); // (100*2) + (50*1)
    });

    test('selectCartItemsCount should count items correctly', () => {
      expect(selectCartItemsCount(mockState)).toBe(3); // 2 + 1
    });

    test('selectCartItemById should find item', () => {
      const item = selectCartItemById(mockState, 1);
      expect(item?.id).toBe(1);
      expect(item?.quantity).toBe(2);
    });
  });
});