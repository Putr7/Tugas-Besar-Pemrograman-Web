import { forwardRef, useState, InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      prefixIcon,
      suffixIcon,
      className = '',
      onFocus,
      onBlur,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-corporate-navy uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div
          className={`flex items-center w-full px-3 py-2 bg-[#F8FAFC] border rounded-xl transition-all duration-150 ${
            error
              ? 'border-status-danger ring-1 ring-status-danger'
              : isFocused
              ? 'border-corporate-navy ring-1 ring-corporate-navy bg-white shadow-sm'
              : 'border-corporate-border hover:border-slate-300'
          }`}
        >
          {prefixIcon && <span className="mr-2.5 text-corporate-slate shrink-0">{prefixIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none disabled:bg-transparent disabled:cursor-not-allowed ${className}`}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />
          {suffixIcon && <span className="ml-2.5 text-corporate-slate shrink-0">{suffixIcon}</span>}
        </div>
        {error && <span className="text-xs font-medium text-status-danger">{error}</span>}
        {!error && helperText && <span className="text-xs text-corporate-slate">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

