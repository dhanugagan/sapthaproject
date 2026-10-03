// SAPTHA — Learn · Inspire · Together · Achieve
// Logout Confirmation Modal

import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { LogOut } from 'lucide-react';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="sm"
      title={
        <span className="flex items-center gap-2 text-[var(--foreground)]">
          <LogOut className="w-5 h-5 text-[var(--muted-foreground)]" />
          Sign out of Admin?
        </span>
      }
    >
      <div className="space-y-4 text-left">
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
          You will need to sign in again to access the admin dashboard and manage projects.
        </p>

        <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-[var(--border)]">
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="destructive" size="sm" onClick={onConfirm}>
            Sign Out
          </Button>
        </div>
      </div>
    </Modal>
  );
};
