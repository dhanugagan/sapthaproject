// SAPTHA — Learn · Inspire · Together · Achieve
// About SAPTHA Platform Page with Smart Campus Companion Integration & 3D Interactive Design

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Instagram,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Globe,
  Zap,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SAPTHA_CONTACT, MAIN_PORTAL_URL } from '../lib/store';
import { useToast } from '../context/ToastContext';
import { BrandLogo } from '../components/common/BrandLogo';

export const AboutPage: React.FC = () => {
  const { showToast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(SAPTHA_CONTACT.email);
    setCopiedEmail(true);
    showToast('Saptha Gmail copied to clipboard', 'success');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="min-h-screen py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative">
      {/* Brand Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-[var(--card)] text-xs font-semibold text-[var(--primary)] shadow-xs">
          <BrandLogo size="sm" showLabel={false} />
          <span>Sapthagiri NPS University</span>
          <span>·</span>
          <span>Learn · Inspire · Together · Achieve</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--foreground)] interactive-heading">
          About{' '}
          <span className="text-gradient-aurora animate-text-shimmer inline-block hover:scale-105 transition-transform">
            SAPTHA
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--muted-foreground)] leading-relaxed text-balance">
          SAPTHA is the official project discovery and student innovation platform of Sapthagiri NPS University (SNPSU), built to help students share meaningful projects and discover what others are building.
        </p>
      </div>

      {/* SAPTHA Smart Campus Companion Section */}
      <section className="p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-blue-950/20 via-[var(--card)] to-cyan-950/20 shadow-xl space-y-4 text-left card-3d relative overflow-hidden">
        {/* Glowing Corner Aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 relative z-10">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              Official University Portal
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--foreground)]">
              SAPTHA Smart Campus Companion
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-xl leading-relaxed">
              Explore the digital ecosystem of Sapthagiri NPS University at{' '}
              <strong className="text-[var(--foreground)] font-mono">sapthasnpsuportal.vercel.app</strong>. Seamlessly bridge university initiatives with student-led engineering builds.
            </p>
          </div>

          <a
            href={MAIN_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 shrink-0"
          >
            <span>Open Smart Campus Companion</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="pt-3 border-t border-[var(--border)] font-mono text-xs text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
          <span>Official Portal:</span>
          <a
            href={MAIN_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-semibold"
          >
            {MAIN_PORTAL_URL}
          </a>
        </div>
      </section>

      {/* Official Contact & Social Access Card */}
      <section className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-lg space-y-5 text-left card-3d">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--primary)] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Direct Contact & Social Community
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--foreground)] mt-0.5">
              Connect with SAPTHA
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={SAPTHA_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 text-xs font-bold transition-all hover:scale-105"
            >
              <Instagram className="w-4 h-4" />
              <span>{SAPTHA_CONTACT.instagram}</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 text-xs font-bold transition-all cursor-pointer hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[var(--border)] text-xs">
          <div className="space-y-1">
            <span className="text-[var(--muted-foreground)]">Saptha Gmail:</span>
            <div className="font-mono font-semibold text-sm text-[var(--foreground)] flex items-center gap-2">
              <a href={`mailto:${SAPTHA_CONTACT.email}`} className="hover:underline">
                {SAPTHA_CONTACT.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[var(--muted-foreground)]">Official Instagram Handle:</span>
            <div className="font-mono font-semibold text-sm text-pink-600 dark:text-pink-400">
              <a
                href={SAPTHA_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {SAPTHA_CONTACT.instagram}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Tagline Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-1.5 card-3d">
          <span className="text-xs font-mono font-bold text-cyan-500">01</span>
          <h3 className="font-display text-base font-bold text-[var(--foreground)]">Learn</h3>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
            Gain real-world intuition by exploring production architecture and source repositories.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-1.5 card-3d">
          <span className="text-xs font-mono font-bold text-indigo-500">02</span>
          <h3 className="font-display text-base font-bold text-[var(--foreground)]">Inspire</h3>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
            Spark new ideas across AI, cybersecurity, web applications, and technology disciplines.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-1.5 card-3d">
          <span className="text-xs font-mono font-bold text-fuchsia-500">03</span>
          <h3 className="font-display text-base font-bold text-[var(--foreground)]">Together</h3>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
            Connect students, innovators, and mentors in a collaborative public showcase.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-1.5 card-3d">
          <span className="text-xs font-mono font-bold text-amber-500">04</span>
          <h3 className="font-display text-base font-bold text-[var(--foreground)]">Achieve</h3>
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
            Elevate portfolios from casual side-projects into professional engineering showcases.
          </p>
        </div>
      </div>

      {/* Why SAPTHA Section */}
      <section className="space-y-4 text-left">
        <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Why SAPTHA?
        </h2>
        <p className="text-sm sm:text-base text-[var(--foreground)]/80 leading-relaxed">
          Too many student capstones, hackathon builds, and developer projects end up forgotten in private folders or local drives. Traditional repositories require visitors to clone code and configure environments just to see what was achieved.
        </p>
        <p className="text-sm sm:text-base text-[var(--foreground)]/80 leading-relaxed">
          SAPTHA works directly alongside the <strong>SAPTHA Smart Campus Companion</strong> (<a href={MAIN_PORTAL_URL} target="_blank" rel="noopener noreferrer" className="text-cyan-500 underline font-mono">sapthasnpsuportal.vercel.app</a>) to provide a curated stage for live demos, verified screenshots, and clear architecture overviews.
        </p>
      </section>

      {/* Admin Approval Requirement */}
      <section className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-3 text-left card-3d">
        <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span>Curated Quality & Admin Verification</span>
        </div>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
          Every submission to SAPTHA is reviewed and approved by the administration team prior to public release. This guarantees high quality, working HTTPS project deployments, and safe external links for the community.
        </p>
      </section>

      {/* Call to Action */}
      <div className="p-8 sm:p-10 rounded-3xl border border-[var(--border)] bg-[var(--card)] text-center space-y-4 relative overflow-hidden card-3d">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--primary)]/10 rounded-full blur-2xl pointer-events-none" />
        <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--foreground)]">
          Ready to showcase what you've built?
        </h3>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-md mx-auto">
          Join Sapthagiri NPS University innovators showcasing their projects on SAPTHA today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/submit">
            <Button size="lg" variant="primary">
              Submit Your Project
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <a href={MAIN_PORTAL_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline">
              Smart Campus Companion ↗
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
