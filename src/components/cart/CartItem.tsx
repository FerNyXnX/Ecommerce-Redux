import { FC, memo } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { removeFromCart, updateQuantity } from '../../features/cart/cartSlice';
import { CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: FC<CartItemProps> = memo(({ item }) => {
  const dispatch = useAppDispatch();
  
  const handleRemove = (): void => {
    dispatch(removeFromCart(item.id));
  };
  
  const handleQuantityChange = (newQuantity: number): void => {
    dispatch(updateQuantity({ productId: item.id, quantity: newQuantity }));
  };
  
  const handleIncrement = (): void => {
    handleQuantityChange(item.quantity + 1);
  };
  
  const handleDecrement = (): void => {
    handleQuantityChange(item.quantity - 1);
  };
  
  const truncateTitle = (title: string, maxLength: number = 40): string => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  const subtotal: number = item.price * item.quantity;
  
  return (
    <article className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <img 
        src={item.image} 
        alt={item.title}
        className="w-20 h-20 object-contain"
      />
      <div className="flex-1">
        <h4 className="font-semibold text-sm" title={item.title}>
          {truncateTitle(item.title)}
        </h4>
        <p className="text-gray-600">{formatPrice(item.price)}</p>
        <p className="text-xs text-gray-500">
          Subtotal: {formatPrice(subtotal)}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrement}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-8 h-8 rounded transition-colors"
          aria-label="Disminuir cantidad"
          type="button"
        >
          -
        </button>
        <span className="font-semibold w-8 text-center" aria-label={`Cantidad: ${item.quantity}`}>
          {item.quantity}
        </span>
        <button
          onClick={handleIncrement}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold w-8 h-8 rounded transition-colors"
          aria-label="Aumentar cantidad"
          type="button"
        >
          +
        </button>
      </div>
      
      <button
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 text-xl font-bold p-2"
        title="Eliminar del carrito"
        aria-label={`Eliminar ${item.title} del carrito`}
        type="button"
      >
        ×
      </button>
    </article>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;