// SAPTHA — Learn · Inspire · Together · Achieve
// Toast Notification Context & ARIA-Accessible Banner System

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastItem, ToastType } from '../types';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { sound } from '../lib/soundEffects';

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration: number = 3800) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const newItem: ToastItem = { id, message, type, duration };

      // Play complementary sound for notification
      if (type === 'success') {
        sound.playSuccess();
      } else if (type === 'error') {
        sound.playDismiss();
      } else {
        sound.playChime();
      }

      setToasts((prev) => [...prev, newItem]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastContainer: React.FC<{
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed z-50 pointer-events-none flex flex-col gap-2 p-4 bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md items-center sm:items-end"
    >
      {toasts.map((toast) => {
        let Icon = Info;
        let borderClass = 'border-slate-300 dark:border-slate-700';
        let iconColor = 'text-blue-500';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          iconColor = 'text-emerald-500';
          borderClass = 'border-emerald-500/30';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = 'text-rose-500';
          borderClass = 'border-rose-500/30';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = 'text-amber-500';
          borderClass = 'border-amber-500/30';
        }

        return (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-center justify-between gap-3 w-full bg-[var(--card)] text-[var(--card-foreground)] px-4 py-3 rounded-xl border ${borderClass} shadow-xl backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-3`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
              <span className="text-sm font-medium leading-tight truncate sm:whitespace-normal">
                {toast.message}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onRemove(toast.id)}
              aria-label="Dismiss notification"
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
