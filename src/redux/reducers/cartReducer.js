import { ActionTypes } from '../actions/types.js';

const initialState = [];

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const existingItem = state.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...state, { ...action.payload, quantity: 1 }];
    
    case ActionTypes.REMOVE_FROM_CART:
      return state.filter(item => item.id !== action.payload);
    
    case ActionTypes.UPDATE_QUANTITY:
      if (action.payload.quantity <= 0) {
        return state.filter(item => item.id !== action.payload.productId);
      }
      
      return state.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    
    default:
      return state;
  }
};

export default cartReducer;