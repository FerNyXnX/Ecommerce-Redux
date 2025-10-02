import { combineReducers } from 'redux';
import productsReducer from './productsReducer.js';
import cartReducer from './cartReducer.js';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

export default rootReducer;