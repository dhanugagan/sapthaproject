// SAPTHA — Learn · Inspire · Together · Achieve
// Edit Project Modal (Category Removed)

import React, { useState, useEffect } from 'react';
import { Project, ProjectStatus } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { UploadCloud, Check } from 'lucide-react';
import { SapthaStore } from '../../lib/store';
import { useToast } from '../../context/ToastContext';

interface EditProjectModalProps {
  project: Project | null;
  categories?: any[];
  isOpen: boolean;
  onClose: () => void;
  onProjectUpdated: (updated: Project) => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onProjectUpdated,
}) => {
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('published');
  const [featured, setFeatured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setTechnologies(project.technologies.join(', '));
      setImageUrl(project.image_url);
      setProjectUrl(project.project_url);
      setGithubUrl(project.github_url || '');
      setCreatorName(project.creator_name);
      setStatus(project.status);
      setFeatured(project.featured);
      setErrors({});
    }
  }, [project, isOpen]);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { url } = await SapthaStore.uploadImage(file);
      setImageUrl(url);
      showToast('Image uploaded successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!projectUrl.trim() || !projectUrl.startsWith('https://')) {
      newErrors.projectUrl = 'Please enter a valid HTTPS project URL';
    }
    if (githubUrl && !githubUrl.includes('github.com')) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL';
    }
    if (!creatorName.trim()) newErrors.creatorName = 'Creator name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please correct errors before saving', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const techArray = technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const updated = await SapthaStore.updateProject(project.id, {
        title: title.trim(),
        description: description.trim(),
        image_url: imageUrl,
        project_url: projectUrl.trim(),
        github_url: githubUrl.trim() || null,
        creator_name: creatorName.trim(),
        technologies: techArray,
        status,
        featured,
      });

      showToast('Project updated successfully', 'success');
      onProjectUpdated(updated);
      onClose();
    } catch (err: any) {
      showToast(err.message || 'Unable to save changes. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="3xl"
      title="Edit Project"
      description={`Update metadata and publication status for "${project.title}"`}
    >
      <form onSubmit={handleSave} className="space-y-4 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Project Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
          />

          <Input
            label="Creator Name"
            required
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            error={errors.creatorName}
          />
        </div>

        <Textarea
          label="Project Description"
          required
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
        />

        <Input
          label="Technologies (comma separated)"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          hint="e.g. React, Next.js, Python, PostgreSQL"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Live Project URL (HTTPS)"
            required
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            placeholder="https://myproject.com"
            error={errors.projectUrl}
          />

          <Input
            label="GitHub Repository URL"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/user/repo"
            error={errors.githubUrl}
          />
        </div>

        {/* Image preview & replace */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--foreground)]">
            Project Thumbnail / Image
          </label>
          <div className="flex items-center gap-4 p-3 border border-[var(--border)] rounded-xl bg-[var(--secondary)]/40">
            <img
              src={imageUrl}
              alt="Thumbnail preview"
              className="w-24 h-14 rounded-lg object-cover border border-[var(--border)] bg-[var(--card)]"
            />
            <div className="space-y-1">
              <label className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--secondary)] cursor-pointer text-[var(--foreground)] transition-colors">
                <UploadCloud className="w-3.5 h-3.5" />
                {isUploading ? 'Uploading...' : 'Replace Image'}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleImageFileChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                Max 1 MB (JPEG, PNG, WebP, AVIF)
              </p>
            </div>
          </div>
        </div>

        {/* Status & Featured Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[var(--border)]">
          <Select
            label="Publication Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
          >
            <option value="published">Published (Live on Showcase)</option>
            <option value="pending">Pending Approval</option>
            <option value="draft">Draft (Private)</option>
            <option value="unpublished">Unpublished</option>
          </Select>

          <div className="flex flex-col justify-center pt-5 sm:pt-4">
            <label className="inline-flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[var(--foreground)]">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              Feature this project on Homepage
            </label>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--border)]">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSaving}
          >
            <Check className="w-3.5 h-3.5" />
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
