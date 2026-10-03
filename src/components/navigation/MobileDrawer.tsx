// SAPTHA — Learn · Inspire · Together · Achieve
// Mobile Navigation Drawer Component with SNPSU Main Portal Connect

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Sun, Moon, Laptop, Compass, PlusCircle, Info, ShieldCheck, Home, Mail, Instagram, ExternalLink, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { SAPTHA_CONTACT, MAIN_PORTAL_URL } from '../../lib/store';
import { BrandLogo } from '../common/BrandLogo';
import { sound } from '../../lib/soundEffects';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const { user, isAdmin, logout } = useAuth();
  const [soundEnabled, setSoundEnabled] = useState(() => sound.isSoundEnabled());

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex sm:hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative ml-auto flex h-full w-4/5 max-w-sm flex-col justify-between bg-[var(--card)] text-[var(--card-foreground)] p-6 shadow-2xl border-l border-[var(--border)] transition-transform duration-200 animate-in slide-in-from-right">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
            <div>
              <BrandLogo size="sm" />
              <p className="text-[11px] text-[var(--primary)] font-medium mt-1">
                Learn · Inspire · Together · Achieve
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* SAPTHA Smart Campus Companion Link */}
          <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 flex items-center justify-between shadow-xs">
            <span className="text-xs font-semibold text-[var(--foreground)]">Smart Campus Companion</span>
            <a
              href={MAIN_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              <span>sapthasnpsuportal.vercel.app</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 flex flex-col space-y-1.5">
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'text-[var(--foreground)] hover:bg-[var(--secondary)]'
                }`
              }
            >
              <Home className="w-4 h-4" />
              Home
            </NavLink>

            <NavLink
              to="/explore"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'text-[var(--foreground)] hover:bg-[var(--secondary)]'
                }`
              }
            >
              <Compass className="w-4 h-4" />
              Explore Projects
            </NavLink>

            <NavLink
              to="/submit"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'text-[var(--foreground)] hover:bg-[var(--secondary)]'
                }`
              }
            >
              <PlusCircle className="w-4 h-4" />
              Submit Project
            </NavLink>

            <NavLink
              to="/about"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'text-[var(--foreground)] hover:bg-[var(--secondary)]'
                }`
              }
            >
              <Info className="w-4 h-4" />
              About SAPTHA
            </NavLink>

            {isAdmin ? (
              <NavLink
                to="/admin"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-[var(--foreground)] hover:bg-[var(--secondary)]'
                  }`
                }
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Admin Console
              </NavLink>
            ) : (
              <NavLink
                to="/auth/login"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[var(--primary)] text-white'
                      : 'text-[var(--muted-foreground)] hover:bg-[var(--secondary)]'
                  }`
                }
              >
                <ShieldCheck className="w-4 h-4" />
                Admin Sign In
              </NavLink>
            )}
          </nav>

          {/* Social Contact Links */}
          <div className="mt-5 pt-4 border-t border-[var(--border)] space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] block mb-1">
              Contact & Social
            </span>
            <a
              href={SAPTHA_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>Instagram: {SAPTHA_CONTACT.instagram}</span>
            </a>
            <a
              href={`mailto:${SAPTHA_CONTACT.email}`}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
            >
              <Mail className="w-4 h-4 text-[var(--primary)]" />
              <span>Saptha Gmail: {SAPTHA_CONTACT.email}</span>
            </a>
          </div>
        </div>

        {/* Footer controls */}
        <div className="pt-4 border-t border-[var(--border)] space-y-3">
          {/* Sound Effects Toggle */}
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span className="font-semibold uppercase tracking-wider">Audio Effects</span>
            <button
              type="button"
              onClick={handleToggleSound}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-medium text-xs ${
                soundEnabled
                  ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                  : 'border-[var(--border)] bg-[var(--secondary)] text-[var(--muted-foreground)]'
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Enabled</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Muted</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span className="font-semibold uppercase tracking-wider">Appearance</span>
            <div className="flex items-center gap-1 p-1 bg-[var(--secondary)] rounded-lg border border-[var(--border)]">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-md transition-colors ${
                  theme === 'light' ? 'bg-[var(--card)] text-[var(--foreground)] shadow-xs' : 'text-[var(--muted-foreground)]'
                }`}
                aria-label="Light theme"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-md transition-colors ${
                  theme === 'dark' ? 'bg-[var(--card)] text-[var(--foreground)] shadow-xs' : 'text-[var(--muted-foreground)]'
                }`}
                aria-label="Dark theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`p-1.5 rounded-md transition-colors ${
                  theme === 'system' ? 'bg-[var(--card)] text-[var(--foreground)] shadow-xs' : 'text-[var(--muted-foreground)]'
                }`}
                aria-label="System theme"
              >
                <Laptop className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {user && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--muted-foreground)] truncate max-w-[150px]">
                {user.email}
              </span>
              <button
                type="button"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="text-[var(--destructive)] font-semibold hover:underline"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
