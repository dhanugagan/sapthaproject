// SAPTHA — Learn · Inspire · Together · Achieve
// Submit Project Page (Approval Required Flow: Starts as Pending for Admin Approval)

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { SapthaStore } from '../lib/store';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { SubmitSuccessModal } from '../components/modals/SubmitSuccessModal';
import { useToast } from '../context/ToastContext';
import { UploadCloud, CheckCircle, X, ShieldAlert, Sparkles } from 'lucide-react';

export const SubmitPage: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [technologies, setTechnologies] = useState('');

  // Image Upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedProject, setSubmittedProject] = useState<Project | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFile = (file: File): string | null => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowed.includes(file.type)) {
      return 'Allowed formats: JPEG, PNG, WebP, AVIF';
    }
    const MAX_SIZE = 1 * 1024 * 1024; // 1 MB
    if (file.size > MAX_SIZE) {
      return 'File size exceeds 1 MB. Please optimize or compress your image.';
    }
    return null;
  };

  const handleFileSelection = (file: File) => {
    const errorMsg = validateFile(file);
    if (errorMsg) {
      showToast(errorMsg, 'error');
      return;
    }

    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!title.trim()) {
      errs.title = 'Project title is required';
    } else if (title.trim().length < 3) {
      errs.title = 'Title must be at least 3 characters';
    }

    if (!description.trim()) {
      errs.description = 'Project description is required';
    } else if (description.trim().length < 15) {
      errs.description = 'Please provide a clear description (minimum 15 characters)';
    }

    if (!imageFile && !imagePreview) {
      errs.image = 'Project thumbnail image is required';
    }

    if (!projectUrl.trim()) {
      errs.projectUrl = 'Live project URL is required';
    } else if (!projectUrl.startsWith('https://')) {
      errs.projectUrl = 'Please enter a valid HTTPS project URL (e.g. https://myproject.com)';
    }

    if (githubUrl.trim()) {
      if (!githubUrl.startsWith('https://') || !githubUrl.includes('github.com')) {
        errs.githubUrl = 'Please enter a valid GitHub repository URL';
      }
    }

    if (!creatorName.trim()) {
      errs.creatorName = 'Creator name is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please fix the highlighted errors before submitting', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      let uploadedUrl = imagePreview || '';
      let uploadedPath = 'uploaded-project-image.jpg';

      if (imageFile) {
        setIsUploading(true);
        const uploadResult = await SapthaStore.uploadImage(imageFile);
        uploadedUrl = uploadResult.url;
        uploadedPath = uploadResult.path;
        setIsUploading(false);
      }

      const techArray = technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      // STRICT ADMIN APPROVAL REQUIREMENT:
      // Status is explicitly set to 'pending'
      const created = await SapthaStore.createProject({
        title: title.trim(),
        description: description.trim(),
        image_url: uploadedUrl,
        image_path: uploadedPath,
        project_url: projectUrl.trim(),
        github_url: githubUrl.trim() || null,
        creator_name: creatorName.trim(),
        technologies: techArray.length > 0 ? techArray : ['Web App'],
        status: 'pending', // Pending Admin Approval
        featured: false,
      });

      setSubmittedProject(created);
      setShowSuccessModal(true);
      showToast('Project submitted for admin approval!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Unable to submit project. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const handleResetForm = () => {
    setTitle('');
    setDescription('');
    setProjectUrl('');
    setGithubUrl('');
    setCreatorName('');
    setTechnologies('');
    removeImage();
    setErrors({});
    setShowSuccessModal(false);
    setSubmittedProject(null);
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 sm:mb-12 text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-1 block font-mono">
          Publish Your Innovation
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)] interactive-heading">
          Submit Your <span className="text-gradient-cosmic">Project</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[var(--muted-foreground)]">
          Submit your project for inclusion in the SAPTHA showcase. Once verified and approved by the admin team, your project will be published live to the global community.
        </p>
      </div>

      {/* Form Container */}
      <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-xl shadow-xl relative overflow-hidden card-3d">
        {/* Subtle moving ambient light in corner */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none animate-ambient-float" />

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Project Title */}
          <Input
            label="Project Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Smart Campus Companion"
            error={errors.title}
          />

          {/* Creator Name */}
          <Input
            label="Creator / Team Name"
            required
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            placeholder="e.g. Dhanush M or Team Innovators"
            error={errors.creatorName}
          />

          {/* Description */}
          <Textarea
            label="Project Description"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what your project does, the problem it solves, and its key technical architecture..."
            error={errors.description}
          />

          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold tracking-tight text-[var(--foreground)]">
              Project Thumbnail / Media Image <span className="text-[var(--destructive)]">*</span>
            </label>

            {imagePreview ? (
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--secondary)]">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/70 hover:bg-black text-white transition-colors cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                  isDragging
                    ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                    : 'border-[var(--border)] hover:border-[var(--border-hover)] bg-[var(--secondary)]/40 hover:bg-[var(--secondary)]/70'
                } ${errors.image ? 'border-[var(--destructive)]' : ''}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <UploadCloud className="w-10 h-10 text-[var(--muted-foreground)] mb-2" />
                <p className="text-sm font-semibold text-[var(--foreground)] text-center">
                  Drag and drop your project image, or <span className="text-[var(--primary)]">browse</span>
                </p>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  JPEG, PNG, WebP, AVIF up to 1 MB
                </p>
              </div>
            )}
            {errors.image && (
              <p className="text-xs text-[var(--destructive)] font-medium">{errors.image}</p>
            )}
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Live Project URL (HTTPS)"
              required
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              placeholder="https://myproject.com"
              hint="Must be a secure https:// address"
              error={errors.projectUrl}
            />

            <Input
              label="GitHub Repository (Optional)"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/user/repo"
              error={errors.githubUrl}
            />
          </div>

          {/* Technologies */}
          <Input
            label="Technologies Used"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="e.g. React, TypeScript, Python, Tailwind, PostgreSQL"
            hint="Separate each technology with a comma"
          />

          {/* Notice banner about approval requirement */}
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Admin Verification Workflow</strong>
              All submissions are placed into the administrator review queue. Once approved, your project goes live immediately on the public Explore page.
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[var(--border)]">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => navigate('/explore')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting || isUploading}
              className="px-6 shadow-sm"
            >
              Submit for Approval
            </Button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <SubmitSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        project={submittedProject}
        onSubmitAnother={handleResetForm}
      />
    </div>
  );
};
