import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsAPI } from './productsAPI';

// AsyncThunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return await productsAPI.fetchAllProducts();
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    return await productsAPI.fetchCategories();
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    return await productsAPI.fetchProductById(productId);
  }
);

const initialState = {
  items: [],
  categories: [],
  selectedCategory: 'all',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentProduct: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts cases
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // fetchCategories cases
      .addCase(fetchCategories.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = ['all', ...action.payload];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // fetchProductById cases
      .addCase(fetchProductById.pending, (state) => {
        state.currentProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { setSelectedCategory, clearError } = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductsByCategory = (state) => {
  const { items, selectedCategory } = state.products;
  
  if (selectedCategory === 'all') {
    return items;
  }
  
  return items.filter(product => product.category === selectedCategory);
};
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectCategories = (state) => state.products.categories;
export const selectSelectedCategory = (state) => state.products.selectedCategory;

export default productsSlice.reducer;