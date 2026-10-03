// SAPTHA — Learn · Inspire · Together · Achieve
// SEO Project Page Component (/project/:slug)

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { SapthaStore } from '../lib/store';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { ShareModal } from '../components/projects/ShareModal';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ExternalLink, Github, Share2, Calendar, Eye, User, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Skeleton } from '../components/ui/Skeleton';

export const ProjectSlugPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;
    setIsLoading(true);
    setImgError(false);

    SapthaStore.getProjectBySlug(slug)
      .then(async (found) => {
        if (found) {
          setProject(found);
          document.title = `${found.title} — SAPTHA`;

          // Track view count
          SapthaStore.incrementProjectViews(found.id);

          // Fetch other projects
          const allProjects = await SapthaStore.getProjects({ status: 'published' });
          setRelatedProjects(allProjects.filter((p) => p.id !== found.id).slice(0, 3));
        } else {
          setProject(null);
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      document.title = 'SAPTHA — Learn · Inspire · Together · Achieve';
    };
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="w-full aspect-video rounded-2xl" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Project not found
        </h2>
        <p className="text-sm text-[var(--muted-foreground)]">
          The project you're looking for doesn't exist or may have been removed.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3">
          <Button variant="outline" size="md" onClick={() => navigate('/explore')}>
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Button>
          <Button variant="primary" size="md" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(project.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="min-h-screen py-10 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Explore', href: '/explore' },
            { label: project.title },
          ]}
        />
      </div>

      {/* Main Header */}
      <header className="space-y-3 mb-8">
        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          <span className="font-semibold text-[var(--primary)]">
            Verified Showcase
          </span>

          <div className="flex items-center gap-3 font-mono">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {project.views} views
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
          </div>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] text-balance">
          {project.title}
        </h1>

        <div className="flex items-center gap-3 pt-1 text-sm text-[var(--muted-foreground)]">
          <span className="flex items-center gap-1.5 font-medium text-[var(--foreground)]">
            <User className="w-4 h-4 text-[var(--muted-foreground)]" />
            Created by {project.creator_name}
          </span>
        </div>
      </header>

      {/* Large Featured Media Showcase */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--secondary)] shadow-sm mb-10">
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center p-8 text-center text-[var(--muted-foreground)]">
            <span className="font-medium text-base">{project.title}</span>
          </div>
        ) : (
          <img
            src={project.image_url}
            alt={`${project.title} showcase overview`}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] mb-10 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] text-xs font-semibold text-[var(--foreground)] transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Project
          </button>
        </div>

        <div className="flex items-center gap-3 flex-1 sm:flex-initial justify-end">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] text-xs sm:text-sm font-semibold text-[var(--foreground)] transition-colors"
            >
              <Github className="w-4 h-4" />
              View Source
            </a>
          )}

          <a
            href={project.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] text-xs sm:text-sm font-semibold shadow-xs transition-colors"
          >
            Visit Live Project
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Description & Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 border-b border-[var(--border)] pb-12">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-display text-lg font-bold text-[var(--foreground)]">
            About the Project
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[var(--foreground)]/90 whitespace-pre-line space-y-4">
            {project.description}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
              Project Information
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[var(--muted-foreground)] block">Creator</span>
                <span className="font-semibold text-[var(--foreground)]">
                  {project.creator_name}
                </span>
              </div>

              <div>
                <span className="text-[var(--muted-foreground)] block">Published Date</span>
                <span className="font-medium text-[var(--foreground)]">{formattedDate}</span>
              </div>

              <div>
                <span className="text-[var(--muted-foreground)] block">Verification</span>
                <span className="text-emerald-500 font-semibold">
                  Admin Verified & Approved
                </span>
              </div>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="pt-3 border-t border-[var(--border)]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] block mb-2">
                  Tech Stack
                </span>
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[var(--foreground)]">
                  {project.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="bg-[var(--secondary)] px-2.5 py-1 rounded border border-[var(--border)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="mt-12 pt-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-xl font-bold tracking-tight text-[var(--foreground)]">
              More Projects
            </h3>
            <Link
              to="/explore"
              className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
            >
              Explore All
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedProjects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onSelect={(selected) => navigate(`/project/${selected.slug}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Share Modal */}
      <ShareModal
        project={project}
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </article>
  );
};
