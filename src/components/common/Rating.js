import React from 'react';

const Rating = ({ rate, count }) => {
  const stars = Math.round(rate);
  
  return (
    <div className="flex items-center space-x-1">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i} 
            className={i < stars ? 'text-yellow-400' : 'text-gray-300'}
          >
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
};

export default Rating;