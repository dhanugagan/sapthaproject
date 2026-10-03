// SAPTHA — Learn · Inspire · Together · Achieve
// ShareModal Component (Web Share API, Clipboard Copy & Social Links)

import React, { useState } from 'react';
import { Project } from '../../types';
import { Modal } from '../ui/Modal';
import { Copy, Check, Share2, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ShareModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ project, isOpen, onClose }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const projectUrl = `${window.location.origin}/project/${project.slug}`;
  const shareTitle = `${project.title} on SAPTHA`;
  const shareText = `Explore "${project.title}" by ${project.creator_name} on SAPTHA — Learn · Inspire · Together · Achieve`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(projectUrl);
      setCopied(true);
      showToast('Project link copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Could not copy link to clipboard', 'error');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: projectUrl,
        });
        showToast('Shared successfully', 'success');
        onClose();
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(projectUrl)}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    projectUrl
  )}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${shareText} ${projectUrl}`
  )}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Project"
      description={`Share "${project.title}" with fellow innovators`}
      maxWidth="md"
    >
      <div className="space-y-4 text-left">
        {/* Copy Link input */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--muted-foreground)]">
            Project Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={projectUrl}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--secondary)] px-3 py-2 text-xs font-mono text-[var(--foreground)] truncate select-all"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Web Share API button if supported */}
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <div>
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] text-xs sm:text-sm font-semibold text-[var(--foreground)] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[var(--primary)]" />
              Open System Share Sheet
            </button>
          </div>
        )}

        {/* Social channels */}
        <div>
          <label className="text-xs font-semibold text-[var(--muted-foreground)] block mb-2">
            Share on Social Media
          </label>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] text-xs font-medium text-[var(--foreground)] transition-colors"
            >
              <Twitter className="w-3.5 h-3.5 text-sky-500" />
              <span>X (Twitter)</span>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] text-xs font-medium text-[var(--foreground)] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] text-xs font-medium text-[var(--foreground)] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};
