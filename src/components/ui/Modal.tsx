// SAPTHA — Learn · Inspire · Together · Achieve
// Accessible Modal and Mobile Bottom Sheet Component

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'xl',
  showCloseButton = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus initial element in modal
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }, 50);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
  }[maxWidth];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Sheet / Modal Container */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative z-10 w-full ${widthClasses} bg-[var(--card)] text-[var(--card-foreground)] border-t sm:border border-[var(--border)] rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col focus:outline-none transition-all duration-200 animate-in fade-in sm:zoom-in-95 slide-in-from-bottom-8 sm:slide-in-from-bottom-0`}
      >
        {/* Mobile Pull Bar */}
        <div className="w-12 h-1 bg-[var(--border)] rounded-full mx-auto mt-2.5 mb-1 sm:hidden shrink-0" />

        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between px-5 sm:px-6 pt-4 pb-3 border-b border-[var(--border)] shrink-0">
            <div className="space-y-0.5 pr-4">
              {title && (
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--foreground)]">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto px-5 sm:px-6 py-4 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};
