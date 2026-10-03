// SAPTHA — Learn · Inspire · Together · Achieve
// Accessible Input Component

import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold tracking-tight text-[var(--foreground)]"
          >
            {label}
            {props.required && <span className="text-[var(--destructive)] ml-0.5">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[var(--muted-foreground)] pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full rounded-lg border bg-[var(--input)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-all duration-150 focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 ${
              leftIcon ? 'pl-9' : ''
            } ${rightIcon ? 'pr-9' : ''} ${
              error
                ? 'border-[var(--destructive)] focus:ring-[var(--destructive)]/20'
                : 'border-[var(--border)] hover:border-[var(--border-hover)]'
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-[var(--muted-foreground)] flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-[var(--destructive)] font-medium">{error}</p>
        ) : hint ? (
          <p className="text-xs text-[var(--muted-foreground)]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
