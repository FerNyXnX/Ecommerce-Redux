import React from 'react';
import Header from './components/common/Header';
import ProductList from './components/products/ProductList';
import ShoppingCart from './components/cart/ShoppingCart';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductList />
      </main>
      <ShoppingCart />
      <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
        <p className="mb-2">
          &copy; 2025 Redux Toolkit Store. Desarrollado con React & Redux Toolkit
        </p>
        <p className="text-sm text-gray-400">
          Datos proporcionados por FakeStore API
        </p>
      </footer>
    </div>
  );
};

export default App;