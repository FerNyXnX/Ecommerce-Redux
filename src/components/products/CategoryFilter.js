import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCategories, 
  selectSelectedCategory, 
  setSelectedCategory 
} from '../../features/products/productsSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  
  const categoryIcons = {
    'all': '🛍️',
    'electronics': '💻',
    'jewelery': '💎',
    "men's clothing": '👔',
    "women's clothing": '👗'
  };
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => dispatch(setSelectedCategory(category))}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
            selectedCategory === category
              ? 'bg-indigo-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
        >
          <span>{categoryIcons[category] || '📦'}</span>
          <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;