import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState, LoadingStatus } from '../../types'; // Sin @types
import ProductsAPI from '../../services/api';
import type { RootState } from '../../app/store';

// AsyncThunks - SIN argumentos, por eso usamos void
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    return await ProductsAPI.fetchAllProducts();
  }
);

export const fetchCategories = createAsyncThunk<string[]>(
  'products/fetchCategories',
  async () => {
    return await ProductsAPI.fetchCategories();
  }
);

export const fetchProductById = createAsyncThunk<Product, number>(
  'products/fetchProductById',
  async (productId) => {
    return await ProductsAPI.fetchProductById(productId);
  }
);

const initialState: ProductsState = {
  items: [],
  categories: [],
  selectedCategory: 'all',
  status: LoadingStatus.Idle,
  error: null,
  currentProduct: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
      state.status = LoadingStatus.Idle;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts cases
      .addCase(fetchProducts.pending, (state) => {
        state.status = LoadingStatus.Loading;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = LoadingStatus.Succeeded;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = LoadingStatus.Failed;
        state.error = action.error.message || 'Error al cargar productos';
      })
      // fetchCategories cases
      .addCase(fetchCategories.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = ['all', ...action.payload];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || 'Error al cargar categorías';
      })
      // fetchProductById cases
      .addCase(fetchProductById.pending, (state) => {
        state.currentProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.error = action.error.message || 'Error al cargar el producto';
      });
  }
});

export const { setSelectedCategory, clearError, clearCurrentProduct } = productsSlice.actions;

// Selectors
export const selectAllProducts = (state: RootState): Product[] => state.products.items;
export const selectProductsByCategory = (state: RootState): Product[] => {
  const { items, selectedCategory } = state.products;
  
  if (selectedCategory === 'all') {
    return items;
  }
  
  return items.filter(product => product.category === selectedCategory);
};
export const selectProductsStatus = (state: RootState): string => state.products.status;
export const selectProductsError = (state: RootState): string | null => state.products.error;
export const selectCategories = (state: RootState): string[] => state.products.categories;
export const selectSelectedCategory = (state: RootState): string => state.products.selectedCategory;
export const selectCurrentProduct = (state: RootState): Product | null => state.products.currentProduct;

export default productsSlice.reducer;