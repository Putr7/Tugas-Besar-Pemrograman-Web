import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-corporate-navy text-white hover:bg-corporate-slateDark focus:ring-corporate-navy shadow-sm',
    secondary:
      'bg-corporate-slateLighter text-corporate-navy border border-corporate-border hover:bg-slate-200 focus:ring-slate-400',
    outline:
      'border-2 border-corporate-navy text-corporate-navy hover:bg-corporate-slateLighter focus:ring-corporate-navy',
    danger:
      'bg-status-danger text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
    ghost:
      'text-corporate-slate hover:bg-corporate-slateLighter hover:text-corporate-navy focus:ring-slate-300',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-2.5 gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && leftIcon}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon}
    </button>
  );
};

export default Button;

