// SAPTHA — Learn · Inspire · Together · Achieve
// Dynamic Prismatic 3D Brand Logo Emblem (Replacing generic S letter)

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', icon: 20, text: 'text-lg', badge: 'text-[9px] px-1 py-0.2' },
    md: { box: 'w-9 h-9', icon: 24, text: 'text-xl sm:text-2xl', badge: 'text-[10px] px-1.5 py-0.5' },
    lg: { box: 'w-11 h-11', icon: 30, text: 'text-2xl sm:text-3xl', badge: 'text-xs px-2 py-0.5' },
    xl: { box: 'w-14 h-14', icon: 38, text: 'text-3xl sm:text-4xl', badge: 'text-xs px-2.5 py-1' },
  };

  const current = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* 3D Prismatic Isometric Emblem */}
      <div className="relative flex items-center justify-center">
        {/* Colorful Glow Aura behind emblem */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500 via-fuchsia-500 to-amber-400 opacity-60 blur-md group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 animate-pulse pointer-events-none" />

        {/* 3D Isometric Faceted Geometry Container */}
        <div
          className={`${current.box} relative rounded-2xl p-[1.5px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 shadow-xl shadow-cyan-500/25 group-hover:shadow-fuchsia-500/40 group-hover:rotate-6 transition-all duration-300 transform-gpu`}
          style={{ perspective: 600 }}
        >
          <div className="w-full h-full rounded-[14px] bg-[#0c1222] flex items-center justify-center overflow-hidden relative">
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            {/* Custom 3D Isometric Crystal/Hexagonal Cube SVG (Zero letter "S") */}
            <svg
              width={current.icon}
              height={current.icon}
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform-gpu group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500"
            >
              <defs>
                <linearGradient id="facetTop" x1="16" y1="3" x2="16" y2="15" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38BDF8" />
                  <stop offset="1" stopColor="#818CF8" />
                </linearGradient>
                <linearGradient id="facetLeft" x1="4" y1="10" x2="16" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#06B6D4" />
                  <stop offset="1" stopColor="#3B82F6" />
                </linearGradient>
                <linearGradient id="facetRight" x1="16" y1="15" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#A855F7" />
                  <stop offset="1" stopColor="#EC4899" />
                </linearGradient>
                <radialGradient id="sparkGlow" cx="16" cy="15" r="4" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 3D Isometric Hex Prism Facets */}
              {/* Top Facet */}
              <polygon points="16,3 27,9.5 16,16 5,9.5" fill="url(#facetTop)" opacity="0.95" />
              {/* Left Facet */}
              <polygon points="5,9.5 16,16 16,29 5,22.5" fill="url(#facetLeft)" opacity="0.9" />
              {/* Right Facet */}
              <polygon points="16,16 27,9.5 27,22.5 16,29" fill="url(#facetRight)" opacity="0.95" />

              {/* Central Glowing Energy Core */}
              <circle cx="16" cy="16" r="3" fill="url(#sparkGlow)" className="animate-ping" style={{ transformOrigin: 'center', animationDuration: '3s' }} />
              <circle cx="16" cy="16" r="2.2" fill="#FFFFFF" opacity="0.9" />

              {/* Facet Edge Highlights */}
              <line x1="16" y1="16" x2="16" y2="29" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.4" />
              <line x1="16" y1="16" x2="5" y2="9.5" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.4" />
              <line x1="16" y1="16" x2="27" y2="9.5" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Typography Label */}
      {showLabel && (
        <div className="flex items-center gap-2">
          <span className={`font-display ${current.text} font-black tracking-tight bg-gradient-to-r from-[var(--foreground)] via-[var(--foreground)] to-[var(--primary)] bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:via-fuchsia-400 group-hover:to-amber-400 transition-all duration-300`}>
            SAPTHA
          </span>
          <span className={`font-mono font-bold uppercase rounded-md bg-gradient-to-r from-cyan-500/15 to-purple-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 ${current.badge} hidden sm:inline-block shadow-xs`}>
            SNPSU
          </span>
        </div>
      )}
    </div>
  );
};
