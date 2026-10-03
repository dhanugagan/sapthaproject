// SAPTHA — Learn · Inspire · Together · Achieve
// Admin Community Submissions Review Queue (Instant One-Click Approval & Verification)

import React, { useEffect, useState } from 'react';
import { Project } from '../../types';
import { SapthaStore } from '../../lib/store';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { Check, X, ExternalLink, Github, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { DeleteConfirmModal } from '../../components/modals/DeleteConfirmModal';

export const AdminSubmissionsPage: React.FC = () => {
  const { showToast } = useToast();
  const [submissions, setSubmissions] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rejectingProject, setRejectingProject] = useState<Project | null>(null);

  const loadSubmissions = async () => {
    setIsLoading(true);
    try {
      const projs = await SapthaStore.getProjects({ status: 'pending' });
      setSubmissions(projs);
    } catch {
      showToast('Failed to load pending submissions', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleApprove = async (project: Project) => {
    try {
      await SapthaStore.approveProject(project.id);
      setSubmissions((prev) => prev.filter((p) => p.id !== project.id));
      showToast(`Approved and published "${project.title}" to public showcase!`, 'success');
    } catch {
      showToast('Unable to approve submission', 'error');
    }
  };

  const handleRejectConfirm = async () => {
    if (!rejectingProject) return;
    try {
      await SapthaStore.deleteProject(rejectingProject.id);
      setSubmissions((prev) => prev.filter((p) => p.id !== rejectingProject.id));
      showToast('Submission rejected and removed', 'info');
      setRejectingProject(null);
    } catch {
      showToast('Unable to reject submission', 'error');
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
            <Clock className="w-3.5 h-3.5" />
            Verification Queue
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Submissions Review
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            Review community submitted projects. Once approved, projects immediately go live on the public Explore page.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
            {submissions.length} Pending Approval
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-xs text-[var(--muted-foreground)]">
          Loading submission queue...
        </div>
      ) : submissions.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-[var(--border)] rounded-2xl bg-[var(--card)]/40 p-6 space-y-3">
          <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto opacity-70" />
          <h3 className="font-display text-base font-bold text-[var(--foreground)]">
            No pending submissions
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] max-w-sm mx-auto">
            All submitted projects have been processed. New entries from the /submit page will appear here for review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all hover:border-[var(--primary)]/40"
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                <img
                  src={sub.image_url}
                  alt=""
                  className="w-24 h-16 rounded-xl object-cover border border-[var(--border)] bg-[var(--secondary)] shrink-0"
                />
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)]">
                    <span>By {sub.creator_name}</span>
                    <span className="text-[var(--muted-foreground)] font-mono text-[11px]">
                      · {new Date(sub.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-[var(--foreground)] truncate">
                    {sub.title}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[var(--muted-foreground)]">
                    <a
                      href={sub.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--primary)] hover:underline font-semibold"
                    >
                      Verify Live HTTPS Deployment
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {sub.github_url && (
                      <>
                        <span>·</span>
                        <a
                          href={sub.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[var(--foreground)] hover:underline font-medium"
                        >
                          <Github className="w-3 h-3" />
                          Source Code
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[var(--border)]">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRejectingProject(sub)}
                  className="text-[var(--destructive)] hover:bg-[var(--destructive)]/10"
                >
                  <X className="w-3.5 h-3.5" />
                  Reject
                </Button>

                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleApprove(sub)}
                  className="bg-emerald-600 hover:bg-emerald-700 shadow-xs hover:scale-105 transition-all"
                >
                  <Check className="w-3.5 h-3.5" />
                  Approve & Publish
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject confirmation modal */}
      <DeleteConfirmModal
        isOpen={Boolean(rejectingProject)}
        title="Reject this submission?"
        projectName={rejectingProject?.title}
        onClose={() => setRejectingProject(null)}
        onConfirm={handleRejectConfirm}
      />
    </div>
  );
};
