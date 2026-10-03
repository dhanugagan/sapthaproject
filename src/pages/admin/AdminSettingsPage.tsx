// SAPTHA — Learn · Inspire · Together · Achieve
// Admin Settings & Infrastructure Diagnostics Page

import React, { useState } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { Database, ShieldCheck, CheckCircle2, AlertCircle, FileCode2, Copy } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const [copiedMigration, setCopiedMigration] = useState(false);

  const handleCopyMigrationCommand = () => {
    navigator.clipboard.writeText('supabase db push');
    setCopiedMigration(true);
    showToast('Command copied to clipboard', 'info');
    setTimeout(() => setCopiedMigration(false), 2000);
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          System Settings & Database
        </h1>
        <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
          Infrastructure parameters, Supabase PostgreSQL synchronization, and security policies.
        </p>
      </div>

      {/* Supabase Connection Status Card */}
      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isSupabaseConfigured
                ? 'bg-emerald-500/10 text-emerald-500'
                : 'bg-blue-500/10 text-blue-500'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">
                Database Engine
              </h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                {isSupabaseConfigured
                  ? 'Connected directly to Supabase Cloud PostgreSQL instance'
                  : 'Operating in High-Performance Local Repository mode with seed data'}
              </p>
            </div>
          </div>

          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
            isSupabaseConfigured
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
              : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
          }`}>
            {isSupabaseConfigured ? 'Live Supabase' : 'Active Local Mode'}
          </span>
        </div>

        {/* Environment configuration */}
        <div className="pt-2 border-t border-[var(--border)] space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
            Environment Checklist (.env.example)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--secondary)]/40 flex items-center justify-between">
              <span className="font-mono">NEXT_PUBLIC_SUPABASE_URL</span>
              {isSupabaseConfigured ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <span className="text-[10px] text-[var(--muted-foreground)]">Optional</span>
              )}
            </div>

            <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--secondary)]/40 flex items-center justify-between">
              <span className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
              {isSupabaseConfigured ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <span className="text-[10px] text-[var(--muted-foreground)]">Optional</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Policies */}
      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--foreground)]">
              Row Level Security (RLS) & Access Control
            </h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              Hardened database rules protecting projects, categories, profiles, and media.
            </p>
          </div>
        </div>

        <ul className="space-y-2 text-xs text-[var(--foreground)]/80">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Public visitors are restricted to <code>status = 'published'</code> records.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Community submissions insert with <code>status = 'pending'</code> awaiting review.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Admin updates and project deletions require verified role <code>'admin'</code>.</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Service-role keys are strictly excluded from client-side bundles.</span>
          </li>
        </ul>
      </div>

      {/* Database Migrations & Seeds */}
      <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">
                Supabase Schema Files
              </h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                Files generated in <code>supabase/migrations/</code> and <code>supabase/seed.sql</code>
              </p>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyMigrationCommand}
          >
            <Copy className="w-3.5 h-3.5" />
            {copiedMigration ? 'Copied' : 'Copy CLI Command'}
          </Button>
        </div>

        <div className="p-3 rounded-lg bg-[var(--secondary)] font-mono text-xs text-[var(--foreground)] space-y-1">
          <p>• supabase/migrations/20261002000000_init_saptha.sql (DDL + Policies + Triggers)</p>
          <p>• supabase/seed.sql (8 Categories + 6 Sample Demonstration Projects)</p>
        </div>
      </div>
    </div>
  );
};
