// SAPTHA — Learn · Inspire · Together · Achieve
// TypeScript Domain Models & Interfaces

export type ProjectStatus = 'draft' | 'pending' | 'published' | 'unpublished';

export type UserRole = 'admin' | 'user';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  image_path: string;
  project_url: string;
  github_url?: string | null;
  category_id?: string;
  creator_name: string;
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
}

export interface ProjectView {
  id: string;
  project_id: string;
  created_at: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface ProjectFilterOptions {
  searchQuery?: string;
  technology?: string;
  sortBy?: 'latest' | 'views' | 'alphabetical';
  status?: ProjectStatus;
  featuredOnly?: boolean;
}

export interface StorageFile {
  name: string;
  url: string;
  size: number;
  type: string;
  uploaded_at: string;
  project_id?: string;
  project_title?: string;
}
