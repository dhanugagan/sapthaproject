// SAPTHA — Learn · Inspire · Together · Achieve
// SearchOverlay Component (Live Real-Time Project Search)

import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../../types';
import { SapthaStore } from '../../lib/store';
import { Search, X, ArrowRight, Clock, Sparkles } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

const RECENT_SEARCHES_KEY = 'saptha_recent_searches_v3';

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Project[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (saved) setRecentSearches(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      const res = await SapthaStore.getProjects({
        searchQuery: query.trim(),
        status: 'published',
      });
      setResults(res);
      setIsSearching(false);
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  const saveRecent = (term: string) => {
    if (!term.trim()) return;
    const clean = term.trim();
    const updated = [clean, ...recentSearches.filter((s) => s.toLowerCase() !== clean.toLowerCase())].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {}
  };

  const handleSelect = (project: Project) => {
    saveRecent(project.title);
    onClose();
    onSelectProject(project);
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-[var(--background)]/95 backdrop-blur-xl animate-in fade-in duration-150"
    >
      {/* Top Search Bar */}
      <div className="w-full border-b border-[var(--border)] px-4 sm:px-8 py-4 bg-[var(--card)] shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Search className="w-5 h-5 text-[var(--muted-foreground)] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by title, stack, creator, or topic..."
            className="w-full bg-transparent text-base sm:text-lg font-medium text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="ml-2 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {query.trim().length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[var(--muted-foreground)]">
                <span>
                  {isSearching ? 'Searching projects...' : `${results.length} results for "${query}"`}
                </span>
              </div>

              {results.length > 0 ? (
                <div className="space-y-2.5">
                  {results.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => handleSelect(project)}
                      className="group flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 hover:bg-[var(--secondary)] transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={project.image_url}
                          alt=""
                          className="w-14 h-10 object-cover rounded-md bg-[var(--secondary)] shrink-0 border border-[var(--border)]"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors truncate">
                            {project.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] truncate mt-0.5">
                            <span>By {project.creator_name}</span>
                            {project.technologies && project.technologies.length > 0 && (
                              <>
                                <span>·</span>
                                <span className="font-mono">{project.technologies.slice(0, 3).join(', ')}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                    </div>
                  ))}
                </div>
              ) : !isSearching ? (
                <div className="py-12 text-center border border-dashed border-[var(--border)] rounded-2xl bg-[var(--card)]/40 p-6">
                  <h4 className="text-base font-bold text-[var(--foreground)]">No projects found</h4>
                  <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)] max-w-sm mx-auto">
                    Try another keyword or submit your own project to the showcase.
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Recent Searches
                  </span>
                  <button
                    type="button"
                    onClick={handleClearRecent}
                    className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:underline cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleRecentClick(term)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--card)] hover:bg-[var(--secondary)] border border-[var(--border)] text-[var(--foreground)] transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
