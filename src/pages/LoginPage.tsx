// SAPTHA — Learn · Inspire · Together · Achieve
// Admin Authentication Login Page (Protected — Credentials Strictly Hidden)

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Lock, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const { login, isAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as any)?.from?.pathname || '/admin';

  if (isAdmin) {
    navigate('/admin', { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email.trim(), password);
      showToast('Welcome back, Administrator', 'success');
      navigate(from, { replace: true });
    } catch (err: any) {
      const msg = err.message || 'Invalid administrator credentials. Access denied.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-14 relative overflow-hidden">
      {/* 3D Moving Ambient Colorful Mesh Orbs */}
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,rgba(168,85,247,0.12)_45%,transparent_75%)] blur-3xl pointer-events-none animate-ambient-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.14)_0%,rgba(59,130,246,0.12)_50%,transparent_75%)] blur-3xl pointer-events-none animate-ambient-float-reverse" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header with 3D Shield Badge */}
        <div className="text-center space-y-3">
          <div className="relative mx-auto w-14 h-14 rounded-2xl p-[1.5px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 shadow-xl shadow-cyan-500/20 group hover:rotate-6 transition-transform">
            <div className="w-full h-full rounded-2xl bg-[var(--card)] flex items-center justify-center text-[var(--primary)] backdrop-blur-xl">
              <ShieldCheck className="w-7 h-7 text-cyan-500 animate-pulse" />
            </div>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[var(--foreground)]">
            Admin Portal Sign In
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            Restricted access for authorized university administrators only.
          </p>
        </div>

        {/* 3D Glassmorphic Login Card */}
        <div className="p-7 sm:p-9 rounded-3xl border border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden transition-all hover:border-[var(--primary)]/40">
          {/* Subtle top iridescent line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <Input
              label="Admin Gmail ID"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter administrator email..."
              leftIcon={<Mail className="w-4 h-4 text-cyan-500" />}
            />

            <Input
              label="Password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              leftIcon={<Lock className="w-4 h-4 text-pink-500" />}
            />

            {error && (
              <div className="p-3 rounded-xl bg-[var(--destructive)]/10 text-[var(--destructive)] text-xs font-semibold border border-[var(--destructive)]/20 animate-in fade-in">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full font-bold shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-transform"
            >
              Sign In to Admin Console
            </Button>
          </form>

          <div className="pt-6 mt-6 border-t border-[var(--border)] text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Public Showcase
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
