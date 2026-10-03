// SAPTHA — Learn · Inspire · Together · Achieve
// Submission Success Modal (Clarifies Admin Approval Verification Flow)

import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Clock, Plus, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../types';

interface SubmitSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSubmitAnother: () => void;
}

export const SubmitSuccessModal: React.FC<SubmitSuccessModalProps> = ({
  isOpen,
  onClose,
  project,
  onSubmitAnother,
}) => {
  const navigate = useNavigate();

  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md" showCloseButton={false}>
      <div className="py-4 text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 animate-pulse">
          <Clock className="h-6 w-6" />
        </div>

        <div className="space-y-1.5">
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight text-[var(--foreground)]">
            Project Submitted for Review
          </h3>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
            Your project <strong>"{project.title}"</strong> has been received by the SAPTHA administration team. It will appear on the public showcase once verified and approved.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-[var(--secondary)]/60 border border-[var(--border)] text-xs text-[var(--muted-foreground)] text-left space-y-1">
          <div className="flex items-center justify-between font-medium text-[var(--foreground)]">
            <span>Status:</span>
            <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase text-[11px] px-2 py-0.5 rounded bg-amber-500/10">
              Pending Admin Approval
            </span>
          </div>
          <p className="text-[11px] text-[var(--muted-foreground)] pt-1">
            Need urgent assistance? Reach out to <strong className="text-[var(--foreground)]">saptha.snpsu@gmail.com</strong> or DM on Instagram <strong className="text-[var(--foreground)]">@saptha_snpsu</strong>.
          </p>
        </div>

        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Button
            variant="outline"
            size="md"
            onClick={onSubmitAnother}
            className="w-full sm:w-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            Submit Another
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onClose();
              navigate('/explore');
            }}
            className="w-full sm:w-auto"
          >
            <Compass className="w-4 h-4" />
            Explore Showcase
          </Button>
        </div>
      </div>
    </Modal>
  );
};
