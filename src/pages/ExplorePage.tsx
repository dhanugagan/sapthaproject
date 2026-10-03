// SAPTHA — Learn · Inspire · Together · Achieve
// Explore Projects Showcase Page (Clean, Distraction-Free Grid)

import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { SapthaStore } from '../lib/store';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { ProjectDetailsModal } from '../components/projects/ProjectDetailsModal';
import { ShareModal } from '../components/projects/ShareModal';
import { Sparkles } from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [shareProject, setShareProject] = useState<Project | null>(null);

  useEffect(() => {
    setIsLoading(true);
    SapthaStore.getProjects({
      status: 'published',
      sortBy: 'latest',
    })
      .then((data) => {
        setProjects(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-500 mb-2 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Showcase</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] interactive-heading">
          Explore <span className="text-gradient-aurora">Projects</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[var(--muted-foreground)] max-w-2xl">
          Discover verified real-world projects and innovations built by the community.
        </p>
      </div>

      {/* Clean Responsive Project Grid */}
      <ProjectGrid
        projects={projects}
        isLoading={isLoading}
        onSelectProject={(p) => setSelectedProject(p)}
        emptyTitle="No published projects yet"
        emptyDescription="Be the first to publish your project! Submit now for administrative verification and approval."
      />

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
