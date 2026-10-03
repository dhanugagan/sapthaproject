// SAPTHA — Learn · Inspire · Together · Achieve
// Admin Media Storage Inspector & Lightbox Viewer

import React, { useState, useEffect } from 'react';
import { StorageFile } from '../../types';
import { SapthaStore } from '../../lib/store';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { UploadCloud, Eye, Image as ImageIcon, HardDrive } from 'lucide-react';

export const AdminMediaPage: React.FC = () => {
  const { showToast } = useToast();
  const [mediaFiles, setMediaFiles] = useState<StorageFile[]>([]);
  const [previewFile, setPreviewFile] = useState<StorageFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setMediaFiles(SapthaStore.getMediaFiles());
  }, []);

  const handleUploadTest = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await SapthaStore.uploadImage(file);
      const newFile: StorageFile = {
        name: res.path,
        url: res.url,
        size: file.size,
        type: file.type,
        uploaded_at: new Date().toISOString(),
        project_title: 'Manual Upload',
      };
      SapthaStore.recordMediaFile(newFile);
      setMediaFiles((prev) => [newFile, ...prev]);
      showToast('Media uploaded to storage bucket successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Media upload failed', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Media Storage
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            Inspect project assets stored in bucket: <strong className="font-mono text-[var(--foreground)]">project-images</strong>.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] cursor-pointer shadow-xs transition-colors">
          <UploadCloud className="w-4 h-4" />
          {isUploading ? 'Uploading...' : 'Upload Media Asset'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleUploadTest}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Storage Information Banner */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--secondary)] flex items-center justify-center text-[var(--primary)]">
            <HardDrive className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-[var(--foreground)] block">
              Supabase Storage Bucket: project-images
            </span>
            <span className="text-[var(--muted-foreground)]">
              Max file size: 1 MB · Allowed: JPEG, PNG, WebP, AVIF
            </span>
          </div>
        </div>

        <div className="font-mono text-[var(--muted-foreground)]">
          Total tracked items: <strong className="text-[var(--foreground)]">{mediaFiles.length}</strong>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaFiles.map((file, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs hover:border-[var(--primary)]/50 transition-all"
          >
            <div className="relative aspect-video w-full bg-[var(--secondary)] overflow-hidden">
              <img
                src={file.url}
                alt={file.name}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <button
                type="button"
                onClick={() => setPreviewFile(file)}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer"
                title="Open Lightbox"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 text-[11px] space-y-1">
              <p className="font-semibold text-[var(--foreground)] truncate" title={file.name}>
                {file.project_title || file.name}
              </p>
              <div className="flex items-center justify-between text-[var(--muted-foreground)] font-mono text-[10px]">
                <span>{(file.size / 1024).toFixed(1)} KB</span>
                <span>{file.type.replace('image/', '')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Lightbox Modal (Modal #5) */}
      <Modal
        isOpen={Boolean(previewFile)}
        onClose={() => setPreviewFile(null)}
        maxWidth="3xl"
        title={previewFile?.project_title || previewFile?.name}
        description={`Size: ${(Number(previewFile?.size || 0) / 1024).toFixed(1)} KB`}
      >
        <div className="p-1">
          <img
            src={previewFile?.url}
            alt={previewFile?.name}
            className="w-full max-h-[70vh] object-contain rounded-lg border border-[var(--border)] bg-black/10"
          />
        </div>
      </Modal>
    </div>
  );
};
