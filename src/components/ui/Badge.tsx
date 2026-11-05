import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'navy';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  const variants = {
    default: 'bg-corporate-slateLighter text-corporate-slate border border-slate-200',
    success: 'bg-emerald-50 text-status-success border border-emerald-200',
    danger: 'bg-red-50 text-status-danger border border-red-200',
    warning: 'bg-amber-50 text-status-warning border border-amber-200',
    navy: 'bg-slate-800 text-white border border-slate-700',
  };

  const dotColors = {
    default: 'bg-corporate-slate',
    success: 'bg-status-success',
    danger: 'bg-status-danger',
    warning: 'bg-status-warning',
    navy: 'bg-white',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 font-medium gap-1',
    md: 'text-xs px-2.5 py-1 font-semibold gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};

export default Badge;

