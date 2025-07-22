import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
  variant?: 'default' | 'glass' | 'elevated' | 'bordered' | 'gradient';
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = true,
  variant = 'default',
  hover = false,
  onClick
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white shadow-sm border border-gray-200',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl',
    elevated: 'bg-white shadow-2xl border-0 hover:shadow-3xl',
    bordered: 'bg-white border-2 border-purple-200 hover:border-purple-300 shadow-lg',
    gradient: 'bg-gradient-to-br from-white to-purple-50 border border-purple-100 shadow-lg'
  };

  const hoverClasses = hover || onClick ? 'transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer' : '';
  const paddingClasses = padding ? 'p-6' : '';

  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${paddingClasses} ${className}`;

  if (onClick) {
    return (
      <div 
        className={cardClasses}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
      >
        {/* Shine effect for interactive cards */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className={cardClasses}>
      {(variant === 'glass' || variant === 'gradient') && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};