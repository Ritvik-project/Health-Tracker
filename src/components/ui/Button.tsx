import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/25',
    secondary: 'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 focus:ring-gray-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 focus:ring-purple-500 backdrop-blur-sm',
    ghost: 'text-gray-300 hover:bg-white/10 hover:text-white focus:ring-gray-500 backdrop-blur-sm',
    gradient: 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 focus:ring-purple-500 shadow-lg hover:shadow-xl hover:shadow-purple-500/30'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm gap-2',
    md: 'px-4 py-2.5 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-3',
    xl: 'px-8 py-4 text-xl gap-3'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const renderIcon = () => {
    if (!icon) return null;
    return (
      <span className={`${iconSizeClasses[size]} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
        {icon}
      </span>
    );
  };

  const renderLoadingSpinner = () => (
    <svg className={`animate-spin ${iconSizeClasses[size]} flex-shrink-0`} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shimmer effect for gradient buttons */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 -top-px bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
      )}
      
      {/* Ripple effect */}
      <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-active:scale-100 transition-transform duration-150"></div>
      
      <div className="flex items-center relative z-10">
        {isLoading && renderLoadingSpinner()}
        {!isLoading && icon && iconPosition === 'left' && renderIcon()}
        <span className="truncate">{children}</span>
        {!isLoading && icon && iconPosition === 'right' && renderIcon()}
      </div>
    </button>
  );
};