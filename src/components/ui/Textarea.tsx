// SAPTHA — Learn · Inspire · Together · Achieve
// Accessible Textarea Component

import React, { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold tracking-tight text-[var(--foreground)]"
          >
            {label}
            {props.required && <span className="text-[var(--destructive)] ml-0.5">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={`w-full rounded-lg border bg-[var(--input)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] transition-all duration-150 focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 resize-y ${
            error
              ? 'border-[var(--destructive)] focus:ring-[var(--destructive)]/20'
              : 'border-[var(--border)] hover:border-[var(--border-hover)]'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-xs text-[var(--destructive)] font-medium">{error}</p>
        ) : hint ? (
          <p className="text-xs text-[var(--muted-foreground)]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
