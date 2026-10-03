// SAPTHA — Learn · Inspire · Together · Achieve
// Interactive Admin Overview Dashboard with One-Click Approval Queue

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SapthaStore } from '../../lib/store';
import { Project } from '../../types';
import { FolderGit2, CheckCircle2, Clock, Eye, ArrowUpRight, Plus, ExternalLink, Check, X, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const AdminOverviewPage: React.FC = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    pendingProjects: 0,
    totalViews: 0,
    recentSubmissions: [] as Project[],
    recentProjects: [] as Project[],
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    setIsLoading(true);
    SapthaStore.getAdminStats()
      .then(setStats)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuickApprove = async (id: string, title: string) => {
    try {
      await SapthaStore.approveProject(id);
      showToast(`Approved and published "${title}"!`, 'success');
      loadData();
    } catch {
      showToast('Failed to approve project', 'error');
    }
  };

  const handleQuickReject = async (id: string) => {
    try {
      await SapthaStore.deleteProject(id);
      showToast('Submission rejected and removed', 'info');
      loadData();
    } catch {
      showToast('Failed to reject submission', 'error');
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Control Hub
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-black tracking-tight text-[var(--foreground)]">
            Platform Overview
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            Manage project submissions, review pipeline, and monitor live showcase projects.
          </p>
        </div>

        <Link to="/submit">
          <Button size="md" variant="primary" className="shadow-xs hover:scale-105 transition-transform">
            <Plus className="w-4 h-4" />
            Add New Project
          </Button>
        </Link>
      </div>

      {/* Metric Cards (With subtle glowing hover micro-interactions) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="group p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-all shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Total Projects</span>
            <FolderGit2 className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl sm:text-4xl font-black font-mono tabular-nums text-[var(--foreground)]">
            {stats.totalProjects}
          </p>
          <span className="text-[11px] text-[var(--muted-foreground)]">
            In system repository
          </span>
        </div>

        <div className="group p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-emerald-500/50 transition-all shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl sm:text-4xl font-black font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
            {stats.publishedProjects}
          </p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Live on public showcase
          </span>
        </div>

        <div className="group p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-amber-500/50 transition-all shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Pending Review</span>
            <Clock className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl sm:text-4xl font-black font-mono tabular-nums text-amber-600 dark:text-amber-400">
            {stats.pendingProjects}
          </p>
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            Requires your approval
          </span>
        </div>

        <div className="group p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-purple-500/50 transition-all shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
            <span>Total Views</span>
            <Eye className="w-4 h-4 text-purple-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl sm:text-4xl font-black font-mono tabular-nums text-[var(--foreground)]">
            {stats.totalViews}
          </p>
          <span className="text-[11px] text-[var(--muted-foreground)]">
            Real visitor interactions
          </span>
        </div>
      </div>

      {/* Two Column Layout: Interactive Pending Approvals & Published Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Submissions Queue with Quick Actions */}
        <div className="p-6 rounded-2xl border border-amber-500/20 bg-[var(--card)] space-y-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-base font-bold text-[var(--foreground)]">
                Pending Approval Queue
              </h3>
              {stats.pendingProjects > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500 text-white animate-pulse">
                  {stats.pendingProjects} New
                </span>
              )}
            </div>
            <Link
              to="/admin/submissions"
              className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
            >
              Full Queue
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats.recentSubmissions.length === 0 ? (
            <div className="py-10 text-center text-xs text-[var(--muted-foreground)] border border-dashed border-[var(--border)] rounded-xl bg-[var(--secondary)]/20 p-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1 opacity-70" />
              <p className="font-medium text-[var(--foreground)]">All submissions approved!</p>
              <p className="text-[11px] mt-0.5">When users submit a project on /submit, it will immediately show up here for one-click approval.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats.recentSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/40 hover:bg-[var(--secondary)]/70 transition-all gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <img
                      src={sub.image_url}
                      alt=""
                      className="w-12 h-9 rounded-lg object-cover border border-[var(--border)] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-[var(--foreground)] truncate">
                        {sub.title}
                      </p>
                      <p className="text-[11px] text-[var(--muted-foreground)] truncate">
                        By {sub.creator_name} · {sub.technologies.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* One-Click Approval Controls */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => handleQuickReject(sub.id)}
                      className="p-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--destructive)]/10 text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors cursor-pointer"
                      title="Reject"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickApprove(sub.id, sub.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-105"
                      title="Approve & Publish"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve & Publish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recently Added Projects */}
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-[var(--foreground)]">
              Published Showcase Projects
            </h3>
            <Link
              to="/admin/projects"
              className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
            >
              Manage all
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats.recentProjects.length === 0 ? (
            <div className="py-10 text-center text-xs text-[var(--muted-foreground)] border border-dashed border-[var(--border)] rounded-xl bg-[var(--secondary)]/20 p-4">
              <FolderGit2 className="w-6 h-6 text-[var(--muted-foreground)] mx-auto mb-1 opacity-50" />
              <p className="font-medium text-[var(--foreground)]">No projects published yet</p>
              <p className="text-[11px] mt-0.5">Approve a submission or add a new project to get started.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {stats.recentProjects.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/40 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <img
                      src={p.image_url}
                      alt=""
                      className="w-10 h-8 rounded-lg object-cover border border-[var(--border)] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-[var(--foreground)] truncate">
                        {p.title}
                      </p>
                      <p className="text-[11px] text-[var(--muted-foreground)] truncate font-mono">
                        {p.creator_name} · {p.views} views
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                        p.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'bg-amber-500/10 text-amber-600'
                      }`}
                    >
                      {p.status}
                    </span>
                    <a
                      href={`/project/${p.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-1.5 rounded hover:bg-[var(--secondary)] transition-colors"
                      title="View live page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
