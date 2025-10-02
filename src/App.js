import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ProductList />
        <div className="border-t-2 border-gray-200 mt-8"></div>
        <ShoppingCart />
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-12">
        <p>&copy; 2025 Mi Tienda Online. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;