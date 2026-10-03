// SAPTHA — Learn · Inspire · Together · Achieve
// Button Component adhering to the Frontend Design Constitution

import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    let baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap shrink-0 active:scale-[0.98] cursor-pointer';

    let variantStyles = '';
    if (variant === 'primary') {
      variantStyles =
        'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-sm';
    } else if (variant === 'secondary') {
      variantStyles =
        'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--border)] border border-[var(--border)]';
    } else if (variant === 'outline') {
      variantStyles =
        'border border-[var(--border)] bg-transparent hover:bg-[var(--secondary)] text-[var(--foreground)]';
    } else if (variant === 'ghost') {
      variantStyles =
        'bg-transparent hover:bg-[var(--secondary)] text-[var(--foreground)]';
    } else if (variant === 'destructive') {
      variantStyles =
        'bg-[var(--destructive)] text-white hover:opacity-90 shadow-sm';
    }

    let sizeStyles = '';
    if (size === 'sm') {
      sizeStyles = 'h-8 px-3 text-xs rounded-lg gap-1.5';
    } else if (size === 'md') {
      sizeStyles = 'h-9 px-4 text-sm rounded-lg gap-2';
    } else if (size === 'lg') {
      sizeStyles = 'h-11 px-5 text-sm sm:text-base rounded-xl gap-2.5 font-semibold';
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
