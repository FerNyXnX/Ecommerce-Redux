import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartItem, CartState, UpdateQuantityPayload } from '../../types'; 
import type { RootState } from '../../app/store';

const loadCartFromStorage = (): CartItem[] => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    const parsedCart = JSON.parse(serializedCart);
    
    if (!Array.isArray(parsedCart)) {
      return [];
    }
    
    return parsedCart as CartItem[];
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
    return [];
  }
};

const saveCartToStorage = (cart: CartItem[]): void => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
};

const initialState: CartState = {
  items: loadCartFromStorage(),
  isOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newCartItem: CartItem = { ...action.payload, quantity: 1 };
        state.items.push(newCartItem);
      }
      
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== productId);
      } else {
        const item = state.items.find(item => item.id === productId);
        if (item) {
          item.quantity = quantity;
        }
      }
      
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;
export const selectCartIsOpen = (state: RootState): boolean => state.cart.isOpen;
export const selectCartTotal = (state: RootState): number => {
  return state.cart.items.reduce((total: number, item: CartItem) => 
    total + (item.price * item.quantity), 0
  );
};
export const selectCartItemsCount = (state: RootState): number => {
  return state.cart.items.reduce((count: number, item: CartItem) => 
    count + item.quantity, 0
  );
};
export const selectCartItemById = (productId: number) => (state: RootState): CartItem | undefined => {
  return state.cart.items.find(item => item.id === productId);
};

export default cartSlice.reducer;