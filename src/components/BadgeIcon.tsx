import React from 'react';

type BadgeType = 'battery' | 'solar' | 'grid';

interface BadgeIconProps {
  type: BadgeType;
  size?: number;
}

/**
 * Lightweight inline-SVG icons for the homepage feature badges.
 * Replaces the Three.js `Mini3DModel` so WebGL stays out of the initial bundle.
 */
export const BadgeIcon: React.FC<BadgeIconProps> = ({ type, size = 48 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (type === 'battery') {
    return (
      <svg {...common}>
        <rect x="2" y="7" width="16" height="10" rx="2" />
        <path d="M22 10v4" />
        <path d="m11 9-2 3h3l-2 3" />
      </svg>
    );
  }

  if (type === 'solar') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    );
  }

  // grid
  return (
    <svg {...common}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M10 6.5h4" />
      <path d="M17.5 10v4" />
      <path d="M10 17.5h4" />
      <path d="M6.5 10v4" />
    </svg>
  );
};
