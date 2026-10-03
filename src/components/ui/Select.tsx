// SAPTHA — Learn · Inspire · Together · Achieve
// Accessible Select Component

import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, className = '', id, children, ...props }, ref) => {
    const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold tracking-tight text-[var(--foreground)]"
          >
            {label}
            {props.required && <span className="text-[var(--destructive)] ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={`w-full appearance-none rounded-lg border bg-[var(--input)] px-3 py-2 pr-9 text-sm text-[var(--foreground)] transition-all duration-150 focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${
              error
                ? 'border-[var(--destructive)] focus:ring-[var(--destructive)]/20'
                : 'border-[var(--border)] hover:border-[var(--border-hover)]'
            } ${className}`}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
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

Select.displayName = 'Select';
