-- SAPTHA — Learn · Inspire · Together · Achieve
-- Production Database Schema & Security Policies

-- 1. Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_path TEXT DEFAULT 'project-image.jpg',
  project_url TEXT NOT NULL,
  github_url TEXT,
  creator_name TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
  featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for lightning fast discovery & filtering
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured) WHERE featured = TRUE;

-- 2. Atomic View Increment Function
CREATE OR REPLACE FUNCTION public.increment_project_views(target_project_id TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.projects
  SET views = COALESCE(views, 0) + 1
  WHERE id = target_project_id;
END;
$$;

-- 3. Row Level Security (RLS) Setup
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow read access to projects
-- Public explore queries filter explicitly by status = 'published'
-- Admin review queue filters by status = 'pending'
DROP POLICY IF EXISTS "Public can view published projects" ON public.projects;
DROP POLICY IF EXISTS "Allow select for projects" ON public.projects;
CREATE POLICY "Allow select for projects"
  ON public.projects
  FOR SELECT
  USING (true);

-- Allow anyone to submit a new project with 'pending' status
DROP POLICY IF EXISTS "Anyone can submit pending project" ON public.projects;
CREATE POLICY "Anyone can submit pending project"
  ON public.projects
  FOR INSERT
  WITH CHECK (status = 'pending');

-- Allow update and approve operations on projects
DROP POLICY IF EXISTS "Allow update for projects" ON public.projects;
CREATE POLICY "Allow update for projects"
  ON public.projects
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow delete operations for rejected or removed projects
DROP POLICY IF EXISTS "Allow delete for projects" ON public.projects;
CREATE POLICY "Allow delete for projects"
  ON public.projects
  FOR DELETE
  USING (true);

-- 4. Storage Bucket Configuration (project-images)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];

-- Storage Policies
DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
CREATE POLICY "Public can view project images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Anyone can upload project images" ON storage.objects;
CREATE POLICY "Anyone can upload project images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Anyone can update project images" ON storage.objects;
CREATE POLICY "Anyone can update project images"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'project-images');

DROP POLICY IF EXISTS "Anyone can delete project images" ON storage.objects;
CREATE POLICY "Anyone can delete project images"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'project-images');
