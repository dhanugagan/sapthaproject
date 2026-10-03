// SAPTHA — Learn · Inspire · Together · Achieve
// Minimalist Brand Footer with 3D Brand Logo, Saptha Gmail, Instagram & Main Portal Access

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Copy, Check, ExternalLink, Globe } from 'lucide-react';
import { SAPTHA_CONTACT, MAIN_PORTAL_URL } from '../../lib/store';
import { useToast } from '../../context/ToastContext';
import { BrandLogo } from '../common/BrandLogo';

export const Footer: React.FC = () => {
  const { showToast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(SAPTHA_CONTACT.email);
    setCopiedEmail(true);
    showToast('Saptha Gmail copied to clipboard', 'success');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-xl text-[var(--card-foreground)] mt-24 transition-colors relative overflow-hidden">
      {/* 3D Prismatic Gradient Top Edge Glow */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand lockup (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <BrandLogo size="md" />

            <p className="text-xs font-semibold text-[var(--primary)] tracking-wide">
              Learn · Inspire · Together · Achieve
            </p>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed max-w-sm">
              The official student innovation and project showcase platform of Sapthagiri NPS University.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={MAIN_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-semibold transition-all hover:scale-105 shadow-xs"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Smart Campus Companion</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={SAPTHA_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/60 hover:bg-[var(--secondary)] text-xs font-semibold text-[var(--foreground)] transition-all hover:scale-105"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <span>{SAPTHA_CONTACT.instagram}</span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/60 hover:bg-[var(--secondary)] text-xs font-semibold text-[var(--foreground)] transition-all cursor-pointer hover:scale-105"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span>{copiedEmail ? 'Copied!' : 'Copy Gmail'}</span>
              </button>
            </div>
          </div>

          {/* Official Saptha Channels & Contact (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Official Channels
            </h4>
            <div className="space-y-2.5 text-xs">
              {/* Saptha Gmail Card */}
              <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/40 hover:border-cyan-500/30 transition-all flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] text-[var(--primary)] uppercase tracking-wider font-bold block">
                    Saptha Gmail
                  </span>
                  <a
                    href={`mailto:${SAPTHA_CONTACT.email}`}
                    className="font-mono text-xs text-[var(--foreground)] hover:text-[var(--primary)] transition-colors font-medium"
                  >
                    {SAPTHA_CONTACT.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg hover:bg-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                  title="Copy Saptha Gmail"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Instagram Card */}
              <div className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--secondary)]/40 hover:border-pink-500/30 transition-all flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] text-pink-500 uppercase tracking-wider font-bold block">
                    Official Instagram
                  </span>
                  <a
                    href={SAPTHA_CONTACT.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[var(--foreground)] hover:text-pink-500 transition-colors font-medium"
                  >
                    {SAPTHA_CONTACT.instagram}
                  </a>
                </div>
                <a
                  href={SAPTHA_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg hover:bg-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Platform Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
              Quick Links
            </h4>
            <ul className="space-y-2 text-[var(--muted-foreground)]">
              <li>
                <Link to="/explore" className="hover:text-[var(--foreground)] transition-colors">
                  Explore Showcase
                </Link>
              </li>
              <li>
                <Link to="/submit" className="hover:text-[var(--foreground)] transition-colors">
                  Submit Project
                </Link>
              </li>
              <li>
                <a
                  href={MAIN_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)] transition-colors flex items-center gap-1 text-[var(--foreground)] font-semibold"
                >
                  <span>Smart Campus Companion</span>
                  <ExternalLink className="w-3 h-3 text-[var(--muted-foreground)]" />
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-[var(--foreground)] transition-colors">
                  About SAPTHA
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="hover:text-[var(--foreground)] transition-colors">
                  Admin Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
          <p>© 2026 SAPTHA · Sapthagiri NPS University (SNPSU). All rights reserved.</p>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>{SAPTHA_CONTACT.email}</span>
            <span>·</span>
            <span>{SAPTHA_CONTACT.instagram}</span>
            <span>·</span>
            <a href={MAIN_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="hover:underline text-[var(--primary)]">
              sapthasnpsuportal.vercel.app
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
