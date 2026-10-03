// SAPTHA — Learn · Inspire · Together · Achieve
// ProjectDetailsModal Component (Categories Removed)

import React, { useState, useEffect } from 'react';
import { Project } from '../../types';
import { Modal } from '../ui/Modal';
import { ExternalLink, Github, Share2, Calendar, User, Eye, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SapthaStore } from '../../lib/store';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onShare: (project: Project) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
  onShare,
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (isOpen && project) {
      setImgError(false);
      SapthaStore.incrementProjectViews(project.id);
    }
  }, [isOpen, project]);

  if (!project) return null;

  const formattedDate = new Date(project.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="3xl">
      <div className="space-y-5 text-left">
        {/* Large Media Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[var(--secondary)] border border-[var(--border)]">
          {imgError ? (
            <div className="flex h-full w-full items-center justify-center p-6 text-[var(--muted-foreground)]">
              <span className="text-sm font-medium">{project.title}</span>
            </div>
          ) : (
            <img
              src={project.image_url}
              alt={project.title}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          )}

          {project.featured && (
            <span className="absolute top-3 right-3 bg-black/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-medium border border-white/10">
              Featured Project
            </span>
          )}
        </div>

        {/* Header Details */}
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[var(--muted-foreground)] mb-1">
            <span className="font-semibold text-[var(--primary)]">
              By {project.creator_name}
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-mono">
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

          <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
            {project.title}
          </h2>
        </div>

        {/* Full Description */}
        <div className="text-sm leading-relaxed text-[var(--foreground)]/90 whitespace-pre-line border-y border-[var(--border)] py-4">
          {project.description}
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[var(--foreground)] font-mono">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-[var(--secondary)] px-2.5 py-1 rounded-md border border-[var(--border)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions & Links Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onShare(project)}
              className="inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] text-[var(--foreground)] transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>

            <Link
              to={`/project/${project.slug}`}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Permalink
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] text-[var(--foreground)] transition-colors"
              >
                <Github className="w-4 h-4" />
                View Source
              </a>
            )}

            <a
              href={project.project_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-xs transition-colors flex-1 sm:flex-initial"
            >
              Visit Live Project
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};
