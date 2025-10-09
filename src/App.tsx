import { FC } from 'react';
import Header from './components/common/Header';
import ProductList from './components/products/ProductList';
import ShoppingCart from './components/cart/ShoppingCart';

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1">
        <ProductList />
      </main>
      <ShoppingCart />
      <footer className="bg-gray-800 text-white text-center p-6 mt-auto">
        <p className="mb-2">
          &copy; 2025 Redux Toolkit Store - TypeScript Edition
        </p>
        <p className="text-sm text-gray-400">
          Desarrollado con React, TypeScript y Redux Toolkit
        </p>
      </footer>
    </div>
  );
};

export default App;