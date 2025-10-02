import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';

const ShoppingCart = () => {
  const cart = useSelector(state => state.cart);
  
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Carrito de Compras</h2>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <span className="text-6xl mb-4 block">🛒</span>
          <p className="text-gray-600 text-lg">Tu carrito está vacío</p>
          <p className="text-gray-500 mt-2">¡Agrega algunos productos para comenzar!</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Carrito de Compras</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Productos ({totalItems})</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-purple-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;