// SAPTHA — Learn · Inspire · Together · Achieve
// Delete Confirmation Modal with Destructive Action Safeguard

import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  projectName?: string;
  isLoading?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete this project?',
  projectName,
  isLoading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        <span className="flex items-center gap-2 text-[var(--destructive)]">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          {title}
        </span>
      }
    >
      <div className="space-y-4 text-left">
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          {projectName ? (
            <>
              Are you sure you want to permanently delete <strong>"{projectName}"</strong>?
            </>
          ) : (
            'Are you sure you want to proceed with deletion?'
          )}
          {' '}This action cannot be undone. The project and its associated media will be removed.
        </p>

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-[var(--border)]">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Delete Project
          </Button>
        </div>
      </div>
    </Modal>
  );
};
