// SAPTHA — Learn · Inspire · Together · Achieve
// Admin Project Management Page (Categories Removed, Interactive Actions)

import React, { useEffect, useState } from 'react';
import { Project, ProjectStatus } from '../../types';
import { SapthaStore } from '../../lib/store';
import { Button } from '../../components/ui/Button';
import { EditProjectModal } from '../../components/modals/EditProjectModal';
import { DeleteConfirmModal } from '../../components/modals/DeleteConfirmModal';
import { useToast } from '../../context/ToastContext';
import {
  Plus,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  Search,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminProjectsPage: React.FC = () => {
  const { showToast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const projs = await SapthaStore.getAllProjectsForAdmin();
      setProjects(projs);
    } catch {
      showToast('Failed to load project database', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTogglePublish = async (project: Project) => {
    const nextStatus: ProjectStatus =
      project.status === 'published' ? 'unpublished' : 'published';
    try {
      const updated = await SapthaStore.updateProject(project.id, {
        status: nextStatus,
      });
      setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      showToast(
        nextStatus === 'published'
          ? 'Project published successfully to showcase'
          : 'Project unpublished',
        'success'
      );
    } catch {
      showToast('Unable to update project status', 'error');
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
      const updated = await SapthaStore.updateProject(project.id, {
        featured: !project.featured,
      });
      setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      showToast(
        updated.featured
          ? 'Project marked as Featured on Homepage'
          : 'Removed from Featured projects',
        'success'
      );
    } catch {
      showToast('Unable to toggle featured flag', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingProject) return;
    setIsDeleting(true);
    try {
      await SapthaStore.deleteProject(deletingProject.id);
      setProjects((prev) => prev.filter((p) => p.id !== deletingProject.id));
      showToast('Project deleted successfully', 'success');
      setDeletingProject(null);
    } catch {
      showToast('Unable to delete project', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      searchFilter.trim() === '' ||
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.creator_name.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Project Repository
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            Inspect, edit metadata, feature, publish, or remove projects.
          </p>
        </div>

        <Link to="/submit">
          <Button size="md" variant="primary" className="shadow-xs hover:scale-105 transition-transform">
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
          <input
            type="search"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter by title or creator..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--muted-foreground)]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded-xl border border-[var(--border)] bg-[var(--background)] px-2.5 py-1.5 text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[var(--border)] bg-[var(--secondary)]/60 text-[var(--muted-foreground)] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3.5">Project</th>
                <th className="px-4 py-3.5">Technologies</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Featured</th>
                <th className="px-4 py-3.5">Creator</th>
                <th className="px-4 py-3.5">Views</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[var(--muted-foreground)]">
                    Loading project repository...
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[var(--muted-foreground)]">
                    No projects found. Add or approve a project to begin.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-[var(--secondary)]/40 transition-colors"
                  >
                    {/* Image & Title */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.image_url}
                          alt=""
                          className="w-12 h-8 rounded-lg object-cover border border-[var(--border)] bg-[var(--secondary)] shrink-0"
                        />
                        <div className="min-w-0 max-w-[200px] sm:max-w-xs">
                          <Link
                            to={`/project/${project.slug}`}
                            className="font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors truncate block"
                          >
                            {project.title}
                          </Link>
                          <span className="text-[11px] font-mono text-[var(--muted-foreground)] truncate block">
                            /{project.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Technologies */}
                    <td className="px-4 py-3 font-mono text-[11px] text-[var(--muted-foreground)]">
                      {project.technologies.slice(0, 3).join(', ')}
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          project.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : project.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-600'
                            : 'bg-slate-500/10 text-slate-500'
                        }`}
                      >
                        {project.status === 'published' && <CheckCircle className="w-3 h-3" />}
                        {project.status}
                      </span>
                    </td>

                    {/* Featured */}
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(project)}
                        className={`p-1 rounded cursor-pointer transition-colors ${
                          project.featured
                            ? 'text-amber-500 hover:text-amber-600'
                            : 'text-[var(--muted-foreground)] opacity-40 hover:opacity-100'
                        }`}
                        title={project.featured ? 'Featured on home' : 'Click to feature'}
                      >
                        <Star className={`w-4 h-4 ${project.featured ? 'fill-amber-500' : ''}`} />
                      </button>
                    </td>

                    {/* Creator */}
                    <td className="px-4 py-3 text-[var(--foreground)] font-medium">
                      {project.creator_name}
                    </td>

                    {/* Views */}
                    <td className="px-4 py-3 font-mono tabular-nums text-[var(--muted-foreground)]">
                      {project.views}
                    </td>

                    {/* Actions Menu */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingProject(project)}
                          className="p-1.5 rounded-lg hover:bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                          title="Edit project"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleTogglePublish(project)}
                          className={`p-1.5 rounded-lg hover:bg-[var(--secondary)] transition-colors cursor-pointer ${
                            project.status === 'published'
                              ? 'text-amber-500 hover:text-amber-600'
                              : 'text-emerald-500 hover:text-emerald-600'
                          }`}
                          title={project.status === 'published' ? 'Unpublish' : 'Publish'}
                        >
                          {project.status === 'published' ? (
                            <XCircle className="w-3.5 h-3.5" />
                          ) : (
                            <CheckCircle className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeletingProject(project)}
                          className="p-1.5 rounded-lg hover:bg-[var(--destructive)]/10 text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors cursor-pointer"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Project Modal */}
      <EditProjectModal
        isOpen={Boolean(editingProject)}
        project={editingProject}
        categories={[]}
        onClose={() => setEditingProject(null)}
        onProjectUpdated={(updated) => {
          setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingProject)}
        projectName={deletingProject?.title}
        isLoading={isDeleting}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
