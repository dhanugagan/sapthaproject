// SAPTHA — Learn · Inspire · Together · Achieve
// 404 Not Found Page

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center space-y-5">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--primary)] px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20">
        Error 404
      </span>

      <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
        Project not found
      </h1>

      <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed">
        The project you're looking for doesn't exist or may have been removed.
      </p>

      <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link to="/explore">
          <Button variant="primary" size="md">
            <Compass className="w-4 h-4" />
            Back to Explore
          </Button>
        </Link>

        <Link to="/">
          <Button variant="outline" size="md">
            <Home className="w-4 h-4" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
