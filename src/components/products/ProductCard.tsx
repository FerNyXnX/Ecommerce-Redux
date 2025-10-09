import { FC, memo } from 'react'; 
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addToCart, selectCartItemById } from '../../features/cart/cartSlice';
import { Product } from '../../types'; 
import Rating from '../common/Rating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = memo(({ product }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItemById(product.id));
  
  const handleAddToCart = (): void => {
    dispatch(addToCart(product));
  };
  
  const truncateTitle = (title: string, maxLength: number = 50): string => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="aspect-w-1 aspect-h-1 p-4 bg-white">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold mb-2 line-clamp-2 h-10" title={product.title}>
          {truncateTitle(product.title)}
        </h3>
        <Rating rate={product.rating.rate} count={product.rating.count} />
        <p className="text-xs text-gray-600 mt-2 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-indigo-600">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2 group"
            aria-label={`Agregar ${product.title} al carrito`}
            type="button"
          >
            <span>Agregar</span>
            {cartItem && (
              <span 
                className="bg-white text-indigo-600 rounded-full px-2 text-sm font-bold group-hover:scale-110 transition-transform"
                aria-label={`${cartItem.quantity} en carrito`}
              >
                {cartItem.quantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;