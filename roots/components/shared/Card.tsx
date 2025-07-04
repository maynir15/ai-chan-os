

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;