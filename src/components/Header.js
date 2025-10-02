import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const cart = useSelector(state => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🛍️</span>
          <h1 className="text-2xl font-bold">Mi Tienda Online</h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🛒</span>
          <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold">
            {totalItems}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;