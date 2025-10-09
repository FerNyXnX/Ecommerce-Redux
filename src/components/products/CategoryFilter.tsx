import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { 
  selectCategories, 
  selectSelectedCategory, 
  setSelectedCategory 
} from '../../features/products/productsSlice';

const CategoryFilter: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  
  const categoryIcons: Record<string, string> = {
    'all': '🛍️',
    'electronics': '💻',
    'jewelery': '💎',
    "men's clothing": '👔',
    "women's clothing": '👗'
  };
  
  const handleCategoryChange = (category: string): void => {
    dispatch(setSelectedCategory(category));
  };
  
  const getCategoryLabel = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filtros de categoría">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
            selectedCategory === category
              ? 'bg-indigo-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          }`}
          aria-pressed={selectedCategory === category}
          type="button"
        >
          <span role="img" aria-hidden="true">{categoryIcons[category] || '📦'}</span>
          <span>{getCategoryLabel(category)}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;