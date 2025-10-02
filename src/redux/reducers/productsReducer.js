import { productsData } from '../../data/products.js';

const initialState = productsData;

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productsReducer;