import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import { ProductSkeleton } from '../common/Loading';
import {
  fetchProducts,
  fetchCategories,
  selectProductsByCategory,
  selectProductsStatus,
  selectProductsError
} from '../../features/products/productsSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductsByCategory);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);
  
  if (status === 'loading') {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Cargando Productos...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  
  if (status === 'failed') {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <span className="text-5xl mb-4 block">❌</span>
          <h3 className="text-xl font-semibold text-red-800 mb-2">
            Error al cargar productos
          </h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => dispatch(fetchProducts())}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Productos Disponibles
        </h2>
        <div className="text-sm text-gray-600">
          {products.length} productos encontrados
        </div>
      </div>
      
      <CategoryFilter />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">📦</span>
          <p className="text-gray-600">No hay productos en esta categoría</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;