import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import { ProductSkeleton, ErrorMessage } from '../common/Loading';
import {
  fetchProducts,
  fetchCategories,
  selectProductsByCategory,
  selectProductsStatus,
  selectProductsError
} from '../../features/products/productsSlice';
import { Product, LoadingStatus } from '../../types'; 

const ProductList: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProductsByCategory);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);
  
  useEffect(() => {
    if (status === LoadingStatus.Idle) {
      dispatch(fetchProducts()); 
      dispatch(fetchCategories()); 
    }
  }, [status, dispatch]);
  
  const handleRetry = (): void => {
    dispatch(fetchProducts()); 
  };
  
  if (status === LoadingStatus.Loading) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Cargando Productos...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  
  if (status === LoadingStatus.Failed) {
    return (
      <div className="container mx-auto p-6">
        <ErrorMessage 
          message={error || 'Error desconocido al cargar productos'}
          onRetry={handleRetry}
        />
      </div>
    );
  }
  
  return (
    <section className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Productos Disponibles
        </h2>
        <div className="text-sm text-gray-600">
          {products.length} {products.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </div>
      </div>
      
      <CategoryFilter />
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block" role="img" aria-label="Caja vacía">📦</span>
          <p className="text-gray-600">No hay productos en esta categoría</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;