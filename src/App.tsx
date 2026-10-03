// SAPTHA — Learn · Inspire · Together · Achieve
// Main Application Router & Entry Point

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { handleGlobalClick } from './lib/soundEffects';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ProjectSlugPage } from './pages/ProjectSlugPage';
import { SubmitPage } from './pages/SubmitPage';
import { AboutPage } from './pages/AboutPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminSubmissionsPage } from './pages/admin/AdminSubmissionsPage';
import { AdminMediaPage } from './pages/admin/AdminMediaPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { Global3DFlow } from './components/common/Global3DFlow';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200 relative">
      <Global3DFlow />
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  useEffect(() => {
    // Attach procedural audio click listener to play distinct sounds for interactive elements
    window.addEventListener('click', handleGlobalClick, { capture: true, passive: true });
    return () => {
      window.removeEventListener('click', handleGlobalClick, { capture: true } as EventListenerOptions);
    };
  }, []);

  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes with Navbar & Footer */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/project/:slug" element={<ProjectSlugPage />} />
                <Route path="/submit" element={<SubmitPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Protected Admin Routes with Sidebar / Mobile Tabs */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverviewPage />} />
                <Route path="submissions" element={<AdminSubmissionsPage />} />
                <Route path="projects" element={<AdminProjectsPage />} />
                <Route path="media" element={<AdminMediaPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
