// SAPTHA — Learn · Inspire · Together · Achieve
// Top Navigation Bar with Direct SNPSU Main Portal Connect & Interactive Micro-Animations

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Menu, Sun, Moon, Laptop, ShieldCheck, Mail, Instagram, ExternalLink, Sparkles, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { MobileDrawer } from './MobileDrawer';
import { SearchOverlay } from './SearchOverlay';
import { Project } from '../../types';
import { SAPTHA_CONTACT, MAIN_PORTAL_URL } from '../../lib/store';
import { BrandLogo } from '../common/BrandLogo';
import { sound } from '../../lib/soundEffects';

interface NavbarProps {
  onSelectProject?: (project: Project) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectProject }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isAdmin } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => sound.isSoundEnabled());

  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <>
      {/* Top Tagline Ribbon */}
      <div className="w-full bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 text-white text-[11px] font-semibold py-1.5 px-4 text-center relative z-50 overflow-hidden shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-extrabold uppercase tracking-wide">SAPTHA</span>
            <span>·</span>
            <span>Learn · Inspire · Together · Achieve</span>
          </span>
          <span className="hidden sm:inline opacity-60">|</span>
          <a
            href={MAIN_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold transition-all hover:scale-105 text-[10px] underline decoration-white/50"
          >
            Smart Campus Companion ↗
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: 3D Prismatic Brand Logo */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-xl"
            >
              <BrandLogo size="md" />
            </Link>
          </div>

          {/* Zone 2: Clean navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--muted-foreground)]">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `transition-colors hover:text-[var(--foreground)] ${
                  isActive ? 'text-[var(--foreground)] font-semibold border-b-2 border-[var(--primary)] pb-0.5' : ''
                }`
              }
            >
              Explore
            </NavLink>

            <NavLink
              to="/submit"
              className={({ isActive }) =>
                `transition-colors hover:text-[var(--foreground)] ${
                  isActive ? 'text-[var(--foreground)] font-semibold border-b-2 border-[var(--primary)] pb-0.5' : ''
                }`
              }
            >
              Submit Project
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition-colors hover:text-[var(--foreground)] ${
                  isActive ? 'text-[var(--foreground)] font-semibold border-b-2 border-[var(--primary)] pb-0.5' : ''
                }`
              }
            >
              About
            </NavLink>

            {/* Direct Connect to Smart Campus Companion */}
            <a
              href={MAIN_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all hover:scale-105 shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Smart Campus Companion</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          {/* Zone 3: Actions + Social/Contact Access (Gmail & Instagram) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Social / Contact Access Links */}
            <div className="hidden lg:flex items-center gap-1.5 pr-2 border-r border-[var(--border)]">
              <a
                href={SAPTHA_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram: @saptha_snpsu"
                className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-pink-500 hover:bg-[var(--secondary)] transition-all hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${SAPTHA_CONTACT.email}`}
                title={`Saptha Gmail: ${SAPTHA_CONTACT.email}`}
                className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--secondary)] transition-all hover:scale-110"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Search trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open project search"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)]/60 hover:bg-[var(--secondary)] text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all cursor-pointer hover:border-[var(--primary)]/40"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline-block font-mono text-[10px] bg-[var(--card)] px-1.5 py-0.5 rounded border border-[var(--border)]">
                /
              </kbd>
            </button>

            {/* Sound Toggle Button */}
            <button
              type="button"
              onClick={handleToggleSound}
              aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              title={soundEnabled ? 'Sound Effects: ON (Click to mute)' : 'Sound Effects: MUTED (Click to enable)'}
              className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-cyan-500 hover:bg-[var(--secondary)] transition-colors cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyan-500" />
              ) : (
                <VolumeX className="w-4 h-4 text-[var(--muted-foreground)] opacity-60" />
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={cycleTheme}
              aria-label="Toggle theme appearance"
              title={`Theme: ${theme}`}
              className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
            >
              {theme === 'system' ? (
                <Laptop className="w-4 h-4" />
              ) : resolvedTheme === 'dark' ? (
                <Moon className="w-4 h-4 text-blue-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </button>

            {/* Admin or Submit CTA */}
            {isAdmin ? (
              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </Link>
            ) : (
              <Link
                to="/submit"
                className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-semibold bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-xs transition-all hover:scale-[1.02]"
              >
                Submit Project
              </Link>
            )}

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open mobile menu"
              className="sm:hidden p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlays */}
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProject={(project) => {
          setSearchOpen(false);
          onSelectProject?.(project);
        }}
      />
    </>
  );
};
