// SAPTHA — Learn · Inspire · Together · Achieve
// ProjectCard Component (Category Removed, Interactive Hover Micro-Interactions)

import React, { useState } from 'react';
import { Project } from '../../types';
import { ExternalLink, ArrowRight, Github, Code2, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
  onShare?: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      role="article"
      tabIndex={0}
      onClick={() => onSelect?.(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(project);
        }
      }}
      className="group card-3d relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] transition-all duration-300 hover:border-cyan-500/60 hover:shadow-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
    >
      <div>
        {/* Project Image Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-[var(--secondary)]">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 animate-pulse bg-[var(--secondary)]" />
          )}

          {imageError ? (
            <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-[var(--muted-foreground)]">
              <Code2 className="mb-2 h-8 w-8 text-[var(--muted-foreground)] opacity-40" />
              <span className="text-xs font-medium">{project.title}</span>
            </div>
          ) : (
            <img
              src={project.image_url}
              alt={`${project.title} showcase screenshot`}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Subtle Featured Marker */}
          {project.featured && (
            <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md text-amber-300 text-[11px] font-semibold px-2 py-0.5 rounded-md tracking-wide border border-amber-400/20 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Featured
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Creator kicker */}
          <div className="mb-1.5 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:from-cyan-400 group-hover:to-fuchsia-400 transition-all">
              By {project.creator_name}
            </span>
            <span className="text-[11px] font-mono tabular-nums">
              {project.views} views
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-[var(--foreground)] group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:tracking-normal transition-all duration-300 line-clamp-1">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)] line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-3.5 flex flex-wrap items-center gap-1.5 text-xs text-[var(--muted-foreground)] font-mono">
              {project.technologies.slice(0, 4).map((tech, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="opacity-40 select-none">·</span>}
                  <span className="bg-[var(--secondary)] px-2 py-0.5 rounded-md border border-[var(--border)]">
                    {tech}
                  </span>
                </React.Fragment>
              ))}
              {project.technologies.length > 4 && (
                <>
                  <span className="opacity-40 select-none">·</span>
                  <span>+{project.technologies.length - 4}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between border-t border-[var(--border)] px-5 py-3 text-xs text-[var(--muted-foreground)]">
        <div className="flex items-center gap-2">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.title} on GitHub`}
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>

        <span className="flex items-center gap-1 font-semibold text-[var(--primary)] transition-all duration-150 group-hover:translate-x-1">
          View Project
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
};
