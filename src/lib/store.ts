// SAPTHA — Learn · Inspire · Together · Achieve
// Production Data Store & Repository

import { Project, ProjectFilterOptions, Profile, ProjectStatus, StorageFile } from '../types';
import { supabase, isSupabaseConfigured, SUPABASE_BUCKET_NAME } from './supabase';

export const MAIN_PORTAL_URL = 'https://sapthasnpsuportal.vercel.app';

export const SAPTHA_CONTACT = {
  email: 'saptha.snpsu@gmail.com',
  instagram: '@saptha_snpsu',
  instagramUrl: 'https://instagram.com/saptha_snpsu',
  mainPortalUrl: 'https://sapthasnpsuportal.vercel.app',
  portalName: 'SAPTHA Smart Campus Companion',
};

// All demo mock data removed as explicitly requested
const INITIAL_PROJECTS: Project[] = [];

// New storage key to guarantee old demo items are cleared from browser cache
const LOCAL_STORAGE_KEY_PROJECTS = 'saptha_projects_live_v3';
const LOCAL_STORAGE_KEY_SESSION = 'saptha_auth_session_v3';
const LOCAL_STORAGE_KEY_MEDIA = 'saptha_media_files_v3';

export const ADMIN_CREDENTIALS = {
  email: 'd8217415366@gmail.com',
  password: 'dhanushm@123',
};

// Authorized administrator emails
const ALLOWED_ADMIN_EMAILS = [
  'd8217415366@gmail.com'.toLowerCase(),
];

function getLocalProjects(): Project[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_PROJECTS);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_PROJECTS;
  }
}

function saveLocalProjects(projects: Project[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save projects to storage', err);
  }
}

export function generateSlug(title: string, existingProjects: Project[], excludeId?: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let candidate = base || 'project';
  let counter = 1;

  while (
    existingProjects.some(
      (p) => p.slug === candidate && (!excludeId || p.id !== excludeId)
    )
  ) {
    counter++;
    candidate = `${base}-${counter}`;
  }

  return candidate;
}

export const SapthaStore = {
  async getProjects(options: ProjectFilterOptions = {}): Promise<Project[]> {
    let projects: Project[] = [];

    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('projects').select('*');

        if (options.status) {
          query = query.eq('status', options.status);
        } else {
          // Public discovery only shows published projects
          query = query.eq('status', 'published');
        }

        if (options.featuredOnly) {
          query = query.eq('featured', true);
        }

        const { data, error } = await query;
        if (!error && data) {
          projects = data as Project[];
        }
      } catch (err) {
        console.warn('Supabase getProjects error, using local store', err);
      }
    }

    if (projects.length === 0) {
      projects = getLocalProjects();
    }

    // Filter by status (public view only sees 'published')
    if (options.status) {
      projects = projects.filter((p) => p.status === options.status);
    } else {
      projects = projects.filter((p) => p.status === 'published');
    }

    // Filter by featuredOnly
    if (options.featuredOnly) {
      projects = projects.filter((p) => p.featured);
    }

    // Filter by technology tag
    if (options.technology && options.technology !== 'all') {
      const targetTech = options.technology.toLowerCase();
      projects = projects.filter((p) =>
        p.technologies?.some((t) => t.toLowerCase() === targetTech)
      );
    }

    // Search query filter (title, description, creator, technologies)
    if (options.searchQuery && options.searchQuery.trim().length > 0) {
      const q = options.searchQuery.toLowerCase().trim();
      projects = projects.filter((p) => {
        const titleMatch = p.title.toLowerCase().includes(q);
        const descMatch = p.description.toLowerCase().includes(q);
        const creatorMatch = p.creator_name.toLowerCase().includes(q);
        const techMatch = p.technologies?.some((t) => t.toLowerCase().includes(q));
        return titleMatch || descMatch || creatorMatch || techMatch;
      });
    }

    // Sorting
    if (options.sortBy === 'views') {
      projects.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (options.sortBy === 'alphabetical') {
      projects.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Default: Latest
      projects.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return projects;
  },

  async getAllProjectsForAdmin(): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) {
          return data as Project[];
        }
      } catch (err) {
        console.warn('Supabase getAllProjectsForAdmin error, using local store', err);
      }
    }
    return getLocalProjects();
  },

  async getFeaturedProjects(): Promise<Project[]> {
    return this.getProjects({ status: 'published', featuredOnly: true });
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        if (!error && data) {
          return data as Project;
        }
      } catch (err) {
        console.warn('Supabase getProjectBySlug error, using local store', err);
      }
    }
    const projects = getLocalProjects();
    const project = projects.find((p) => p.slug === slug);
    return project || null;
  },

  // CRITICAL APPROVAL REQUIREMENT:
  // When a project is added, it defaults to 'pending' unless explicitly set by admin.
  async createProject(data: {
    title: string;
    description: string;
    image_url: string;
    image_path?: string;
    project_url: string;
    github_url?: string | null;
    creator_name: string;
    technologies: string[];
    status?: ProjectStatus;
    featured?: boolean;
  }): Promise<Project> {
    const currentProjects = getLocalProjects();
    const slug = generateSlug(data.title, currentProjects);
    const now = new Date().toISOString();

    // Default to 'pending' so only admin approval publishes it
    const initialStatus: ProjectStatus = data.status || 'pending';

    const newProject: Project = {
      id: `p-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: data.title.trim(),
      slug,
      description: data.description.trim(),
      image_url: data.image_url,
      image_path: data.image_path || 'project-image.jpg',
      project_url: data.project_url.trim(),
      github_url: data.github_url?.trim() || null,
      creator_name: data.creator_name.trim(),
      technologies: data.technologies,
      status: initialStatus,
      featured: data.featured || false,
      views: 0,
      created_at: now,
      updated_at: now,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data: created, error } = await supabase
          .from('projects')
          .insert([newProject])
          .select()
          .single();
        if (!error && created) {
          return created as Project;
        }
      } catch (err) {
        console.warn('Supabase createProject error, saving locally', err);
      }
    }

    currentProjects.unshift(newProject);
    saveLocalProjects(currentProjects);

    // Save to media storage list
    this.recordMediaFile({
      name: newProject.image_path,
      url: newProject.image_url,
      size: 450 * 1024,
      type: 'image/jpeg',
      uploaded_at: now,
      project_id: newProject.id,
      project_title: newProject.title,
    });

    return newProject;
  },

  async approveProject(id: string): Promise<Project> {
    return this.updateProject(id, { status: 'published' });
  },

  async updateProject(
    id: string,
    updates: Partial<Omit<Project, 'id' | 'created_at'>>
  ): Promise<Project> {
    const now = new Date().toISOString();

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .update({ ...updates, updated_at: now })
          .eq('id', id)
          .select()
          .single();
        if (!error && data) {
          return data as Project;
        }
      } catch (err) {
        console.warn('Supabase updateProject error, updating locally', err);
      }
    }

    const projects = getLocalProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Project with ID ${id} not found`);
    }

    const updated = {
      ...projects[index],
      ...updates,
      updated_at: now,
    };

    projects[index] = updated;
    saveLocalProjects(projects);
    return updated;
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (!error) {
          return true;
        }
      } catch (err) {
        console.warn('Supabase deleteProject error, deleting locally', err);
      }
    }

    const projects = getLocalProjects();
    const filtered = projects.filter((p) => p.id !== id);
    saveLocalProjects(filtered);
    return true;
  },

  async incrementProjectViews(id: string): Promise<void> {
    const viewedKey = `saptha_viewed_${id}`;
    if (sessionStorage.getItem(viewedKey)) {
      return;
    }
    sessionStorage.setItem(viewedKey, 'true');

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.rpc('increment_project_views', { target_project_id: id });
        return;
      } catch (err) {
        console.warn('Supabase RPC increment_project_views failed, updating locally', err);
      }
    }

    const projects = getLocalProjects();
    const target = projects.find((p) => p.id === id);
    if (target) {
      target.views = (target.views || 0) + 1;
      saveLocalProjects(projects);
    }
  },

  async uploadImage(file: File): Promise<{ url: string; path: string }> {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid format. Only JPEG, PNG, WebP, and AVIF are allowed.');
    }

    const MAX_SIZE = 1 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error('Image size exceeds 1 MB limit. Please compress your image.');
    }

    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.storage
          .from(SUPABASE_BUCKET_NAME)
          .upload(`public/${filename}`, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (!error && data) {
          const { data: pubData } = supabase.storage
            .from(SUPABASE_BUCKET_NAME)
            .getPublicUrl(data.path);
          return { url: pubData.publicUrl, path: data.path };
        }
      } catch (err) {
        console.warn('Supabase storage upload error, using local data URL', err);
      }
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const resultUrl = reader.result as string;
        resolve({
          url: resultUrl,
          path: filename,
        });
      };
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });
  },

  recordMediaFile(media: StorageFile) {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_MEDIA);
      const files: StorageFile[] = raw ? JSON.parse(raw) : [];
      files.unshift(media);
      localStorage.setItem(LOCAL_STORAGE_KEY_MEDIA, JSON.stringify(files.slice(0, 50)));
    } catch (err) {
      console.warn('Failed to record media file', err);
    }
  },

  getMediaFiles(): StorageFile[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_MEDIA);
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  },

  async getAdminStats() {
    const projects = getLocalProjects();
    const totalProjects = projects.length;
    const publishedProjects = projects.filter((p) => p.status === 'published').length;
    const pendingProjects = projects.filter((p) => p.status === 'pending').length;
    const totalViews = projects.reduce((acc, p) => acc + (p.views || 0), 0);

    return {
      totalProjects,
      publishedProjects,
      pendingProjects,
      totalViews,
      recentSubmissions: projects.filter((p) => p.status === 'pending'),
      recentProjects: projects.slice(0, 8),
    };
  },

  // Exclusive Administrator Authentication
  async signInAdmin(email: string, pass: string): Promise<Profile> {
    const inputEmail = email.toLowerCase().trim();

    // Check credentials: only d8217415366@gmail.com with password dhanushm@123
    if (
      inputEmail === ADMIN_CREDENTIALS.email.toLowerCase() &&
      pass === ADMIN_CREDENTIALS.password
    ) {
      const adminProfile: Profile = {
        id: 'usr-admin-dhanush',
        name: 'Dhanush M (Administrator)',
        email: ADMIN_CREDENTIALS.email,
        role: 'admin',
        created_at: '2026-10-01T00:00:00Z',
      };
      localStorage.setItem(LOCAL_STORAGE_KEY_SESSION, JSON.stringify(adminProfile));
      return adminProfile;
    }

    if (isSupabaseConfigured && supabase) {
      // Strictly restrict admin login to the designated email only
      if (inputEmail !== ADMIN_CREDENTIALS.email.toLowerCase()) {
        throw new Error('Access denied. Administrator privileges are restricted to d8217415366@gmail.com.');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: inputEmail,
        password: pass,
      });

      if (!error && data.user) {
        const prof: Profile = {
          id: data.user.id,
          name: 'Dhanush M (Administrator)',
          email: ADMIN_CREDENTIALS.email,
          role: 'admin',
          created_at: data.user.created_at,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY_SESSION, JSON.stringify(prof));
        return prof;
      }
    }

    throw new Error('Access denied. Invalid administrator email or password.');
  },

  getCurrentUser(): Profile | null {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_SESSION);
      if (raw) {
        const prof: Profile = JSON.parse(raw);
        // Exclusively allow d8217415366@gmail.com
        if (
          prof &&
          prof.email?.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
          prof.role === 'admin'
        ) {
          return prof;
        }
      }
    } catch {}
    return null;
  },

  signOut(): void {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY_SESSION);
  },
};
