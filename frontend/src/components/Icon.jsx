import React from 'react'

const iconProps = (size = 20) => ({ width: size, height: size, viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })

export const Bell = ({ className = '', title = 'Notifications', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 0 1-6 0"/>
  </svg>
)

export const User = ({ className = '', title = 'User', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

export const House = ({ className = '', title = 'Dashboard', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

export const Briefcase = ({ className = '', title = 'Samruddhih', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)

export const GraduationCap = ({ className = '', title = 'Shiksha', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)

export const Scale = ({ className = '', title = 'Shaktih', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <path d="M16 16h6M8 8h6M16 8v8M8 8v8M12 20V4M4 20h16"/>
  </svg>
)

export const Shield = ({ className = '', title = 'Safety', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

export const ArrowRight = ({ className = '', title = 'Next', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

export const BarChart = ({ className = '', title = 'Progress', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <line x1="12" y1="20" x2="12" y2="10"/>
    <line x1="18" y1="20" x2="18" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="16"/>
  </svg>
)

export const Folder = ({ className = '', title = 'Applications', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
)

export const Search = ({ className = '', title = 'Search', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

export const ChevronUp = ({ className = '', title = 'Expand', size = 20 }) => (
  <svg className={className} {...iconProps(size)} role="img" aria-label={title}>
    <polyline points="18 15 12 9 6 15"/>
  </svg>
)
