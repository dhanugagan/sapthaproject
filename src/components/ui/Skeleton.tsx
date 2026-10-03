// SAPTHA — Learn · Inspire · Together · Achieve
// Skeleton Loading Component

import React from 'react';

export const Skeleton: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-[var(--secondary)] border border-[var(--border)]/40 ${className}`}
      aria-hidden="true"
    />
  );
};

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden p-4 space-y-3">
      <Skeleton className="w-full aspect-video rounded-lg" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex items-center gap-2 pt-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
};
