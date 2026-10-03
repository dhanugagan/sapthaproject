// SAPTHA — Learn · Inspire · Together · Achieve
// Responsive ProjectGrid Component

import React from 'react';
import { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleton } from '../ui/Skeleton';

interface ProjectGridProps {
  projects: Project[];
  isLoading?: boolean;
  onSelectProject?: (project: Project) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  onClearFilters?: () => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  isLoading = false,
  onSelectProject,
  emptyTitle = 'No projects found',
  emptyDescription = 'Try adjusting your search keywords or choosing another category.',
  onClearFilters,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-[var(--border)] rounded-2xl bg-[var(--card)]/40 my-8">
        <h4 className="text-base sm:text-lg font-bold text-[var(--foreground)] tracking-tight">
          {emptyTitle}
        </h4>
        <p className="mt-1.5 text-xs sm:text-sm text-[var(--muted-foreground)] max-w-sm">
          {emptyDescription}
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-4 text-xs font-semibold text-[var(--primary)] hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelect={onSelectProject}
        />
      ))}
    </div>
  );
};
