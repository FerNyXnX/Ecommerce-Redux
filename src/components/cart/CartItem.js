import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  
  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };
  
  const handleQuantityChange = (newQuantity) => {
    dispatch(updateQuantity({ productId: item.id, quantity: newQuantity }));
  };
  
  const truncateTitle = (title, maxLength = 40) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <img 
        src={item.image} 
        alt={item.title}
        className="w-20 h-20 object-contain"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-sm" title={item.title}>
          {truncateTitle(item.title)}
        </h4>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        <p className="text-xs text-gray-500">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-8 h-8 rounded transition-colors"
        >
          -
        </button>
        <span className="font-semibold w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-8 h-8 rounded transition-colors"
        >
          +
        </button>
      </div>
      
      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 text-xl font-bold p-2"
        title="Eliminar del carrito"
      >
        ×
      </button>
    </div>
  );
};

export default CartItem;