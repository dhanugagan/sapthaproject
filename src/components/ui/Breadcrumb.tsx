// SAPTHA — Learn · Inspire · Together · Achieve
// Accessible Breadcrumb Component

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumb: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="w-3 h-3 text-[var(--muted-foreground)] shrink-0" />}
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className="hover:text-[var(--foreground)] transition-colors hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-[var(--foreground)] font-medium truncate max-w-xs' : ''}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
