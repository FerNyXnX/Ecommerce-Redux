import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../../features/cart/cartSlice';
import { selectCartItemsCount } from '../../features/cart/cartSlice';

const Header = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector(selectCartItemsCount);
  
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">🛍️</span>
          <div>
            <h1 className="text-2xl font-bold">Redux Toolkit Store</h1>
            <p className="text-xs opacity-90">Powered by FakeStore API</p>
          </div>
        </div>
        <button
          onClick={() => dispatch(toggleCart())}
          className="relative flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
        >
          <span className="text-2xl">🛒</span>
          <span className="font-semibold">Carrito</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold animate-pulse">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;