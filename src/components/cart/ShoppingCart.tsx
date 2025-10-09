import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CartItem from './CartItem';
import {
  selectCartItems,
  selectCartIsOpen,
  selectCartTotal,
  selectCartItemsCount,
  clearCart,
  closeCart
} from '../../features/cart/cartSlice';
import { CartItem as CartItemType } from '../../types';

const ShoppingCart: FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const isOpen = useAppSelector(selectCartIsOpen);
  const totalPrice = useAppSelector(selectCartTotal);
  const totalItems = useAppSelector(selectCartItemsCount);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const handleCheckout = (): void => {
    alert('¡Gracias por tu compra! (Esta es una demo)');
    dispatch(clearCart());
    dispatch(closeCart());
  };
  
  const handleClearCart = (): void => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      dispatch(clearCart());
    }
  };
  
  const handleCloseCart = (): void => {
    dispatch(closeCart());
  };
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={handleCloseCart}
        aria-hidden="true"
      />
      
      <aside 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-50 shadow-xl z-50 flex flex-col transform transition-transform"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <header className="bg-white p-4 shadow flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <span role="img" aria-label="Carrito">🛒</span>
            <span>Carrito de Compras</span>
          </h2>
          <button
            onClick={handleCloseCart}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none p-1"
            aria-label="Cerrar carrito"
            type="button"
          >
            ×
          </button>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block" role="img" aria-label="Carrito vacío">🛒</span>
              <p className="text-gray-600 text-lg">Tu carrito está vacío</p>
              <p className="text-gray-500 mt-2">¡Agrega algunos productos!</p>
              <button
                onClick={handleCloseCart}
                className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                type="button"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item: CartItemType) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <footer className="bg-white p-6 shadow-lg">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-lg">
                <span>Productos ({totalItems})</span>
                <span className="font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className="text-green-600 font-semibold">Gratis</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-indigo-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold"
              type="button"
            >
              Proceder al Pago
            </button>
            
            <button 
              onClick={handleClearCart}
              className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              type="button"
            >
              Vaciar Carrito
            </button>
          </footer>
        )}
      </aside>
    </>
  );
};

export default ShoppingCart;