import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import cartReducer from '../features/cart/cartSlice';
import productsReducer from '../features/products/productsSlice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      products: productsReducer,
    },
    preloadedState: preloadedState as RootState,
  });

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';