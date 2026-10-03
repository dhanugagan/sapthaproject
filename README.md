# SAPTHA — Learn · Inspire · Together · Achieve

> Official Student Project Discovery and Engineering Showcase of **Sapthagiri NPS University (SNPSU)**.
> Main Academic Companion: [sapthasnpsuportal.vercel.app](https://sapthasnpsuportal.vercel.app)

---

## Real-World Workflow

```text
Student Submits Project (/submit)
              │
              ▼
   Saved with status: "pending" in Supabase Database
              │
              ▼
  Admin Reviews at /admin/submissions
              │
      ┌───────┴───────┐
      ▼               ▼
   [Approve]       [Reject]
      │
      ▼
Status changes to "published"
      │
      ▼
Immediately visible to anyone worldwide at:
  • Home Page Featured Section (/)
  • Explore Projects Grid (/explore)
  • Direct Permalink (/project/:slug)
```

---

## Deployment Architecture

```text
GitHub Push (main)
        │
        ▼
  GitHub Actions (.github/workflows/deploy.yml)
   ├── 1. Install & Type Check (npm ci && npm run lint)
   ├── 2. Build Web Application (npm run build)
   ├── 3. Apply Supabase Database Migrations (supabase db push)
   └── 4. Deploy to Vercel (Production)
```

---

## Initial Setup Guide

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In **Project Settings → API**, copy:
   - **Project URL**
   - **Project API anon key**
3. In **SQL Editor**, run the initial migration in `supabase/migrations/20261003000000_init_saptha_schema.sql` (or let GitHub Actions apply it automatically).

### 2. Configure Environment Variables in Vercel
When importing your GitHub repository into [Vercel](https://vercel.com):
- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Add Environment Variables:
  ```env
  VITE_SUPABASE_URL=https://your-project-ref.supabase.co
  VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
  ```

### 3. Add GitHub Actions Secrets (For Auto-Deploy)
In your GitHub Repository → **Settings → Secrets and variables → Actions**, add:
- `VITE_SUPABASE_URL`: Your Supabase Project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase Public Anon Key
- `SUPABASE_ACCESS_TOKEN`: Generated at [supabase.com/account/tokens](https://supabase.com/account/tokens)
- `SUPABASE_PROJECT_REF`: Your project reference ID (from your Supabase URL: `https://<ref>.supabase.co`)
- `SUPABASE_DB_PASSWORD`: Your Supabase Database password
- `VERCEL_TOKEN`: Generated at [vercel.com/account/tokens](https://vercel.com/account/tokens)
- `VERCEL_ORG_ID`: Found in `.vercel/project.json` or team settings
- `VERCEL_PROJECT_ID`: Found in `.vercel/project.json` or project settings

---

## Daily Workflow

After setup, whenever you make changes:

```bash
git add .
git commit -m "Update platform features"
git push origin main
```

GitHub Actions automatically builds your project, pushes any database migrations to Supabase, and deploys the live site to Vercel.
