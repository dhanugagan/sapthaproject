-- SAPTHA — Learn · Inspire · Together · Achieve
-- Production Database Migration for Supabase / PostgreSQL

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Profiles Table (Mapped to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    image_path TEXT NOT NULL,
    project_url TEXT NOT NULL,
    github_url TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE RESTRICT,
    creator_name TEXT NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'pending', 'published', 'unpublished')),
    featured BOOLEAN NOT NULL DEFAULT false,
    views INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Project Views Table
CREATE TABLE IF NOT EXISTS public.project_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Indexes for High Performance Queries
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category_id ON public.projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_views_project_id ON public.project_views(project_id);

-- 7. View Increment RPC Function
CREATE OR REPLACE FUNCTION public.increment_project_views(target_project_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.project_views (project_id)
    VALUES (target_project_id);

    UPDATE public.projects
    SET views = views + 1
    WHERE id = target_project_id;
END;
$$;

-- 8. Updated At Trigger Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_project_updated ON public.projects;
CREATE TRIGGER on_project_updated
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 9. Row Level Security (RLS) Policies
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_views ENABLE ROW LEVEL SECURITY;

-- Categories RLS: Anyone can view, only admin can mutate
CREATE POLICY "Categories are viewable by everyone" 
    ON public.categories FOR SELECT 
    USING (true);

CREATE POLICY "Categories can be inserted by admins only" 
    ON public.categories FOR INSERT 
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Categories can be updated by admins only" 
    ON public.categories FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Categories can be deleted by admins only" 
    ON public.categories FOR DELETE 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Profiles RLS: Users can view/edit their own, admins can view all
CREATE POLICY "Profiles viewable by owner or admin"
    ON public.profiles FOR SELECT
    USING (
        auth.uid() = id OR 
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Profiles updatable by owner or admin"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Projects RLS:
-- Public can view published projects.
-- Admins can view all projects (including draft, pending, unpublished).
-- Anyone authenticated or public submitters can insert with status='pending'.
-- Only admins can update or delete.
CREATE POLICY "Public can view published projects"
    ON public.projects FOR SELECT
    USING (
        status = 'published' OR 
        (
            auth.uid() IS NOT NULL AND 
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
            )
        )
    );

CREATE POLICY "Community can submit projects as pending"
    ON public.projects FOR INSERT
    WITH CHECK (
        status = 'pending' OR
        (
            auth.uid() IS NOT NULL AND 
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
            )
        )
    );

CREATE POLICY "Admins can update any project"
    ON public.projects FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete any project"
    ON public.projects FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Project Views RLS
CREATE POLICY "Anyone can register a project view"
    ON public.project_views FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can view view-logs"
    ON public.project_views FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- 10. Supabase Storage Setup (Storage bucket: project-images)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
-- Storage policies:
-- CREATE POLICY "Public read project images" ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
-- CREATE POLICY "Submitters can upload project images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images' AND (storage.foldername(name))[1] != 'private');
-- CREATE POLICY "Admins can delete project images" ON storage.objects FOR DELETE USING (bucket_id = 'project-images' AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
