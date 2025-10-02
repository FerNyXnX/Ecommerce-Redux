import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/cartActions';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };
  
  const handleQuantityChange = (newQuantity) => {
    dispatch(updateQuantity(item.id, newQuantity));
  };
  
  const handleIncrement = () => {
    handleQuantityChange(item.quantity + 1);
  };
  
  const handleDecrement = () => {
    handleQuantityChange(item.quantity - 1);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-3xl">{item.image}</span>
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-gray-600">${item.price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrement}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded"
          >
            -
          </button>
          <span className="font-semibold w-8 text-center">{item.quantity}</span>
          <button
            onClick={handleIncrement}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded"
          >
            +
          </button>
        </div>
        
        <button
          onClick={handleRemove}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CartItem;