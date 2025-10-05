import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import {
  selectCartItems,
  selectCartIsOpen,
  selectCartTotal,
  selectCartItemsCount,
  clearCart,
  closeCart
} from '../../features/cart/cartSlice';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const isOpen = useSelector(selectCartIsOpen);
  const totalPrice = useSelector(selectCartTotal);
  const totalItems = useSelector(selectCartItemsCount);
  
  if (!isOpen) return null;
  
  const handleCheckout = () => {
    alert('¡Gracias por tu compra! (Esta es una demo)');
    dispatch(clearCart());
    dispatch(closeCart());
  };
  
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={() => dispatch(closeCart())}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-50 shadow-xl z-50 flex flex-col transform transition-transform">
        <div className="bg-white p-4 shadow flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <span>🛒</span>
            <span>Carrito de Compras</span>
          </h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none p-1"
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🛒</span>
              <p className="text-gray-600 text-lg">Tu carrito está vacío</p>
              <p className="text-gray-500 mt-2">¡Agrega algunos productos!</p>
              <button
                onClick={() => dispatch(closeCart())}
                className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="bg-white p-6 shadow-lg">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-lg">
                <span>Productos ({totalItems})</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-green-600 font-semibold">Gratis</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold"
            >
              Proceder al Pago
            </button>
            
            <button 
              onClick={() => dispatch(clearCart())}
              className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Vaciar Carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;