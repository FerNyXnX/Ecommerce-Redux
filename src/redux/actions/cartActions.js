import { ActionTypes } from './types';

export const addToCart = (product) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: product
});

export const removeFromCart = (productId) => ({
  type: ActionTypes.REMOVE_FROM_CART,
  payload: productId
});

export const updateQuantity = (productId, quantity) => ({
  type: ActionTypes.UPDATE_QUANTITY,
  payload: { productId, quantity }
});