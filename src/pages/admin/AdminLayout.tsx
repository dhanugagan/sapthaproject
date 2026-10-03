// SAPTHA — Learn · Inspire · Together · Achieve
// Admin Dashboard Layout (Interactive, Live Pending Submission Counter, Clean Navigation)

import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogoutConfirmModal } from '../../components/modals/LogoutConfirmModal';
import { SapthaStore, SAPTHA_CONTACT } from '../../lib/store';
import {
  LayoutDashboard,
  FolderGit2,
  Inbox,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Instagram,
  Mail,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { BrandLogo } from '../../components/common/BrandLogo';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, isLoading, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    if (isAdmin) {
      SapthaStore.getAdminStats().then((s) => setPendingCount(s.pendingProjects));
    }
  }, [isAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleConfirmLogout = () => {
    logout();
    setLogoutModalOpen(false);
    showToast('Signed out successfully', 'info');
    navigate('/auth/login');
  };

  const navItems = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/submissions', label: 'Submissions', icon: Inbox, badge: pendingCount > 0 ? pendingCount : undefined },
    { to: '/admin/projects', label: 'Projects', icon: FolderGit2 },
    { to: '/admin/media', label: 'Media Assets', icon: ImageIcon },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--background)]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col justify-between border-r border-[var(--border)] bg-[var(--card)] p-4 shrink-0">
        <div className="space-y-6">
          {/* Header Brand */}
          <div className="px-2 pt-2 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <BrandLogo size="sm" showLabel={false} />
              <span className="font-display text-base font-black tracking-tight text-[var(--foreground)]">
                SAPTHA
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-600 dark:text-cyan-400 font-bold border border-cyan-500/20">
                ADMIN
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[var(--primary)] text-white shadow-xs'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-amber-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-4 border-t border-[var(--border)]">
          <Link
            to="/submit"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 text-xs font-semibold rounded-xl bg-[var(--secondary)] hover:bg-[var(--border)] text-[var(--foreground)] border border-[var(--border)] transition-all hover:scale-[1.02]"
          >
            <Plus className="w-3.5 h-3.5 text-[var(--primary)]" />
            New Submission
          </Link>

          <Link
            to="/"
            className="flex items-center justify-between px-3 py-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <span>Public Showcase</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between px-2 pt-2 border-t border-[var(--border)]">
            <div className="min-w-0 pr-2">
              <p className="text-xs font-bold text-[var(--foreground)] truncate">
                Admin Panel
              </p>
              <p className="text-[11px] font-mono text-[var(--muted-foreground)] truncate">
                {user?.email}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              title="Sign Out"
              className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--destructive)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Top & Bottom Navigation */}
      <div className="md:hidden flex flex-col w-full">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--card)]">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <BrandLogo size="sm" showLabel={false} />
              <span className="font-display text-base font-bold text-[var(--foreground)]">
                SAPTHA
              </span>
            </Link>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold border border-cyan-500/20">
              ADMIN
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/submit"
              className="p-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => setLogoutModalOpen(true)}
              className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--destructive)]"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto p-2 border-b border-[var(--border)] bg-[var(--secondary)]/40 scrollbar-none">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[var(--primary)] text-white font-semibold'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`
              }
            >
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-amber-500 text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};
