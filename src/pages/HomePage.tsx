// SAPTHA — Learn · Inspire · Together · Achieve
// Home Page Component (Vibrant 3D Aesthetics, Interactive 3D Canvas, SAPTHA Showcase)

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { SapthaStore, SAPTHA_CONTACT, MAIN_PORTAL_URL } from '../lib/store';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { ProjectDetailsModal } from '../components/projects/ProjectDetailsModal';
import { ShareModal } from '../components/projects/ShareModal';
import { Hero3DCanvas } from '../components/common/Hero3DCanvas';
import {
  ArrowRight,
  Compass,
  PlusCircle,
  Sparkles,
  Mail,
  Instagram,
  ExternalLink,
  Layers,
  Zap,
  Globe,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const HomePage: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [allPublishedProjects, setAllPublishedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [shareProject, setShareProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      SapthaStore.getFeaturedProjects(),
      SapthaStore.getProjects({ status: 'published' }),
    ])
      .then(([featured, all]) => {
        setFeaturedProjects(featured);
        setAllPublishedProjects(all);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const displayProjects =
    featuredProjects.length > 0 ? featuredProjects : allPublishedProjects.slice(0, 6);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Moving Ambient Glowing Energy Spheres */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.22)_0%,rgba(168,85,247,0.12)_40%,rgba(236,72,153,0.06)_60%,transparent_75%)] pointer-events-none blur-3xl animate-ambient-float" />
      <div className="absolute top-1/2 right-4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,rgba(59,130,246,0.1)_45%,transparent_75%)] pointer-events-none blur-3xl animate-ambient-float-reverse" />

      {/* Hero Section with Interactive 3D Canvas */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-28 border-b border-[var(--border)] overflow-hidden">
        {/* Interactive 3D Particle Constellation Canvas */}
        <Hero3DCanvas />

        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7 z-10">
          {/* 3D Holographic Kicker Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full p-[1.5px] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 shadow-xl shadow-cyan-500/20 transition-all hover:scale-105 cursor-default group">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--card)]/95 backdrop-blur-xl">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="font-display font-black text-xs tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                SAPTHA
              </span>
              <span className="text-[var(--border)]">|</span>
              <span className="text-xs font-bold text-gradient-aurora tracking-wide group-hover:tracking-wider transition-all duration-300">
                Learn · Inspire · Together · Achieve
              </span>
            </div>
          </div>

          {/* Vibrantly Styled Interactive 3D Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--foreground)] max-w-4xl mx-auto leading-[1.08] text-balance interactive-heading">
            <span className="inline-block transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:text-cyan-400 cursor-default">
              Build.
            </span>{' '}
            <span className="inline-block transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-gradient-aurora animate-text-shimmer cursor-default">
              Share.
            </span>{' '}
            <span className="inline-block transition-all duration-300 hover:scale-105 hover:-translate-y-1 text-gradient-sunset cursor-default">
              Discover.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg lg:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed text-balance">
            The official project discovery platform of Sapthagiri NPS University. Showcase meaningful innovations, discover peer builds, and launch live creations.
          </p>

          {/* CTAs with Colorful 3D Hover Depth */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/explore')}
              className="w-full sm:w-auto shadow-xl shadow-cyan-500/20 hover:scale-[1.02] hover:-translate-y-0.5 transition-all"
            >
              <Compass className="w-4 h-4" />
              Explore Student Projects
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/submit')}
              className="w-full sm:w-auto hover:scale-[1.02] hover:-translate-y-0.5 transition-all border border-[var(--border)]"
            >
              <PlusCircle className="w-4 h-4" />
              Submit Your Project
            </Button>

            <a
              href={MAIN_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 text-[var(--foreground)] text-sm font-bold shadow-md transition-all hover:scale-[1.02] hover:-translate-y-0.5"
            >
              <Globe className="w-4 h-4 text-cyan-500" />
              <span>Smart Campus Companion</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-500" />
            </a>
          </div>

          {/* Official Channels Quick-Access in Hero */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href={MAIN_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-cyan-500/30 bg-[var(--card)]/80 hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 transition-all font-mono shadow-xs hover:scale-105"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>sapthasnpsuportal.vercel.app</span>
            </a>

            <a
              href={SAPTHA_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-pink-500/30 bg-[var(--card)]/80 hover:bg-pink-500/10 text-pink-600 dark:text-pink-400 transition-all hover:scale-105 shadow-xs"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="font-medium">{SAPTHA_CONTACT.instagram}</span>
            </a>

            <a
              href={`mailto:${SAPTHA_CONTACT.email}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-indigo-500/30 bg-[var(--card)]/80 hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 transition-all hover:scale-105 shadow-xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="font-medium">Saptha Gmail: {SAPTHA_CONTACT.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="text-left">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-cyan-500 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Showcase
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              Student Innovations
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)]">
              Real projects published by students and verified by the SAPTHA administration team.
            </p>
          </div>

          <Link
            to="/explore"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--primary)] hover:underline whitespace-nowrap"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {displayProjects.length > 0 ? (
          <ProjectGrid
            projects={displayProjects}
            isLoading={isLoading}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        ) : !isLoading ? (
          <div className="p-10 sm:p-16 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--card)]/60 backdrop-blur-xl text-center space-y-4 shadow-xl">
            <div className="mx-auto w-14 h-14 rounded-2xl p-[1.5px] bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-amber-400 flex items-center justify-center">
              <div className="w-full h-full rounded-2xl bg-[var(--card)] flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-[var(--foreground)]">
              Ready for the First Submission
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed">
              All previous demo data was cleared. Submit your project now to be featured in the official showcase once approved by admin!
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Button size="md" variant="primary" onClick={() => navigate('/submit')}>
                <PlusCircle className="w-4 h-4" />
                Submit Project
              </Button>
              <a
                href={MAIN_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] text-xs font-semibold text-[var(--foreground)] transition-colors"
              >
                <span>Smart Campus Companion</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <ProjectGrid projects={[]} isLoading={true} />
        )}
      </section>

      {/* 3D Interactive Feature Flow Section (Discover -> Explore -> Open -> Share) */}
      <section className="py-20 border-t border-[var(--border)] bg-[var(--card)]/30 backdrop-blur-md relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-1 flex items-center justify-center gap-1.5 font-mono">
              <Zap className="w-3.5 h-3.5" />
              The Showcase Workflow
            </h3>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)] interactive-heading">
              <span className="text-gradient-aurora">Discover</span> → <span className="text-gradient-cosmic">Explore</span> → <span className="text-gradient-cyber">Open</span> → <span className="text-gradient-sunset">Share</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[var(--muted-foreground)]">
              Connecting Sapthagiri NPS University creators with the global tech community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Card 1 */}
            <div className="group p-6 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 to-transparent hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 card-3d space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold text-xs font-mono border border-cyan-500/20 shadow-xs group-hover:scale-110 transition-transform">
                01
              </div>
              <h4 className="font-display text-xl font-bold text-[var(--foreground)] group-hover:text-cyan-400 group-hover:tracking-wider transition-all duration-300">
                Discover
              </h4>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Browse verified capstone and hackathon builds across Web, AI, IoT, and Cloud Systems.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/5 to-transparent hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 card-3d space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xs font-mono border border-indigo-500/20 shadow-xs group-hover:scale-110 transition-transform">
                02
              </div>
              <h4 className="font-display text-xl font-bold text-[var(--foreground)] group-hover:text-indigo-400 group-hover:tracking-wider transition-all duration-300">
                Explore
              </h4>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Inspect architecture diagrams, tech stacks, and creators behind every university project.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-6 rounded-3xl border border-fuchsia-500/20 bg-gradient-to-b from-fuchsia-500/5 to-transparent hover:border-fuchsia-400 hover:shadow-xl hover:shadow-fuchsia-500/10 transition-all duration-300 card-3d space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center font-bold text-xs font-mono border border-fuchsia-500/20 shadow-xs group-hover:scale-110 transition-transform">
                03
              </div>
              <h4 className="font-display text-xl font-bold text-[var(--foreground)] group-hover:text-fuchsia-400 group-hover:tracking-wider transition-all duration-300">
                Open
              </h4>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Launch directly to the creator's live HTTPS deployment or inspect source code on GitHub.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group p-6 rounded-3xl border border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 card-3d space-y-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs font-mono border border-amber-500/20 shadow-xs group-hover:scale-110 transition-transform">
                04
              </div>
              <h4 className="font-display text-xl font-bold text-[var(--foreground)] group-hover:text-amber-400 group-hover:tracking-wider transition-all duration-300">
                Share
              </h4>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                Inspire peers with clean permalinks, social share cards, and mobile-friendly links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details & Share Modals */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onShare={(p) => {
          setSelectedProject(null);
          setShareProject(p);
        }}
      />

      <ShareModal
        project={shareProject}
        isOpen={Boolean(shareProject)}
        onClose={() => setShareProject(null)}
      />
    </div>
  );
};
