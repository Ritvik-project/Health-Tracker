import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
  variant?: 'default' | 'glass' | 'floating';
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  helperText,
  className = '',
  variant = 'glass',
  rightElement,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);
  };

  const baseInputClasses = `
    block w-full rounded-xl px-4 py-3 text-base
    placeholder-gray-400 shadow-sm transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    default: `
      border border-gray-300 bg-white
      focus:border-blue-500 focus:ring-blue-500/20
      hover:border-gray-400
    `,
    glass: `
      border border-white/30 bg-white/10 backdrop-blur-sm
      text-white placeholder-gray-300
      focus:border-purple-400 focus:ring-purple-500/20 focus:bg-white/20
      hover:border-white/40 hover:bg-white/15
    `,
    floating: `
      border border-gray-300 bg-white pt-6 pb-2
      focus:border-blue-500 focus:ring-blue-500/20
      hover:border-gray-400
    `
  };

  const iconPadding = icon ? 'pl-11' : '';
  const rightElementPadding = rightElement ? 'pr-11' : '';
  const errorClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50' 
    : '';

  const inputClasses = `
    ${baseInputClasses}
    ${variantClasses[variant]}
    ${iconPadding}
    ${rightElementPadding}
    ${errorClasses}
    ${className}
  `;

  const FloatingLabel = () => (
    <label className={`
      absolute left-4 transition-all duration-300 pointer-events-none
      ${isFocused || hasValue 
        ? 'top-2 text-xs text-blue-600 font-medium' 
        : 'top-1/2 -translate-y-1/2 text-base text-gray-500'
      }
      ${error ? 'text-red-600' : ''}
    `}>
      {label}
    </label>
  );

  const RegularLabel = () => (
    <label className={`
      block text-sm font-medium mb-2 transition-colors duration-200
      ${variant === 'glass' ? 'text-gray-200' : 'text-gray-700'}
      ${error ? 'text-red-400' : ''}
    `}>
      {label}
    </label>
  );

  return (
    <div className="space-y-1">
      {label && variant !== 'floating' && <RegularLabel />}
      
      <div className="relative group">
        {/* Background glow effect */}
        {variant === 'glass' && isFocused && (
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-75 transition-opacity duration-300"></div>
        )}
        
        {/* Icon */}
        {icon && (
          <div className={`
            absolute left-0 top-0 h-full flex items-center pl-3 pointer-events-none z-10
            ${variant === 'floating' && (isFocused || hasValue) ? 'top-3' : ''}
            transition-all duration-300
          `}>
            <div className={`
              transition-colors duration-300
              ${isFocused 
                ? variant === 'glass' ? 'text-purple-300' : 'text-blue-500'
                : variant === 'glass' ? 'text-gray-400' : 'text-gray-400'
              }
              ${error ? 'text-red-400' : ''}
            `}>
              {icon}
            </div>
          </div>
        )}

        {/* Floating label */}
        {label && variant === 'floating' && <FloatingLabel />}

        {/* Input field */}
        <input
          className={inputClasses}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />

        {/* Right element */}
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
            {rightElement}
          </div>
        )}

        {/* Focus ring animation */}
        {isFocused && (
          <div className={`
            absolute inset-0 rounded-xl pointer-events-none
            ${variant === 'glass' 
              ? 'ring-2 ring-purple-400/30 animate-pulse' 
              : 'ring-2 ring-blue-500/30'
            }
          `}></div>
        )}
      </div>

      {/* Helper text or error */}
      {(error || helperText) && (
        <div className="flex items-start space-x-1">
          {error && (
            <div className="flex items-center space-x-1 animate-shake">
              <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
              <p className={`text-sm ${variant === 'glass' ? 'text-red-300' : 'text-red-600'}`}>
                {error}
              </p>
            </div>
          )}
          {!error && helperText && (
            <p className={`text-sm ${variant === 'glass' ? 'text-gray-300' : 'text-gray-500'}`}>
              {helperText}
            </p>
          )}
        </div>
      )}
    </div>
  );
};