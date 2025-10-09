import React, { FC } from 'react';

interface RatingProps {
  rate: number;
  count: number;
}

const Rating: FC<RatingProps> = ({ rate, count }) => {
  const stars = Math.round(rate);
  const maxStars = 5;
  
  return (
    <div className="flex items-center space-x-1" aria-label={`Calificación: ${rate} de 5 estrellas`}>
      <div className="flex" role="img" aria-label={`${stars} estrellas`}>
        {Array.from({ length: maxStars }, (_, index) => (
          <span 
            key={index} 
            className={index < stars ? 'text-yellow-400' : 'text-gray-300'}
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