/**
 * EduTech Design System - Design Tokens
 * Centralized design tokens for consistent theming across the application
 * Based on Material Design 3 and Tailwind CSS principles
 */

// ============================================================================
// COLORS - Semantic color system with light/dark mode support
// ============================================================================

export const colors = {
  // Primary - Main brand color (Blue-Purple gradient base)
  primary: {
    50: '#f0f4ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1', // Main
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },

  // Track-specific colors
  tracks: {
    ai: {
      light: '#a855f7', // Purple
      main: '#9333ea',
      dark: '#7e22ce',
      gradient: 'from-purple-500 via-pink-500 to-purple-700',
    },
    kids: {
      light: '#38bdf8', // Blue
      main: '#0ea5e9',
      dark: '#0284c7',
      gradient: 'from-blue-500 via-cyan-500 to-blue-700',
    },
    pro: {
      light: '#fb923c', // Orange
      main: '#f97316',
      dark: '#ea580c',
      gradient: 'from-orange-500 via-red-500 to-orange-700',
    },
    edu: {
      light: '#34d399', // Green
      main: '#10b981',
      dark: '#059669',
      gradient: 'from-green-500 via-emerald-500 to-green-700',
    },
    camp: {
      light: '#fbbf24', // Yellow
      main: '#f59e0b',
      dark: '#d97706',
      gradient: 'from-yellow-500 via-amber-500 to-yellow-700',
    },
  },

  // Semantic colors
  semantic: {
    success: {
      light: '#86efac',
      main: '#22c55e',
      dark: '#16a34a',
    },
    warning: {
      light: '#fcd34d',
      main: '#eab308',
      dark: '#ca8a04',
    },
    error: {
      light: '#fca5a5',
      main: '#ef4444',
      dark: '#dc2626',
    },
    info: {
      light: '#93c5fd',
      main: '#3b82f6',
      dark: '#2563eb',
    },
  },

  // Neutral grays
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
} as const;

// ============================================================================
// TYPOGRAPHY - Font scales and weights
// ============================================================================

export const typography = {
  fonts: {
    sans: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
    display: 'var(--font-geist-sans)',
  },

  sizes: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },

  weights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const;

// ============================================================================
// SPACING - Consistent spacing scale (based on 4px grid)
// ============================================================================

export const spacing = {
  0: '0px',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem', // 12px
  3.5: '0.875rem', // 14px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  11: '2.75rem', // 44px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
  64: '16rem', // 256px
  72: '18rem', // 288px
  80: '20rem', // 320px
  96: '24rem', // 384px
} as const;

// ============================================================================
// RADIUS - Border radius values
// ============================================================================

export const radius = {
  none: '0px',
  sm: '0.125rem', // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// ============================================================================
// SHADOWS - Elevation system
// ============================================================================

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',

  // Colored shadows for track cards
  tracks: {
    ai: '0 20px 40px -12px rgba(168, 85, 247, 0.4)',
    kids: '0 20px 40px -12px rgba(56, 189, 248, 0.4)',
    pro: '0 20px 40px -12px rgba(251, 146, 60, 0.4)',
    edu: '0 20px 40px -12px rgba(52, 211, 153, 0.4)',
    camp: '0 20px 40px -12px rgba(251, 191, 36, 0.4)',
  },
} as const;

// ============================================================================
// ANIMATIONS - Motion configuration
// ============================================================================

export const animations = {
  // Durations
  durations: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '800ms',
  },

  // Easing functions
  easings: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  // Transitions
  transitions: {
    all: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color, background-color, border-color 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    opacity: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ============================================================================
// BREAKPOINTS - Responsive design breakpoints
// ============================================================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// Z-INDEX - Layering system
// ============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
  max: 9999,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get track color by track ID
 */
export function getTrackColor(trackId: string, variant: 'light' | 'main' | 'dark' = 'main') {
  const track = colors.tracks[trackId as keyof typeof colors.tracks];
  return track ? track[variant] : colors.primary[500];
}

/**
 * Get track gradient classes
 */
export function getTrackGradient(trackId: string) {
  const track = colors.tracks[trackId as keyof typeof colors.tracks];
  return track ? track.gradient : 'from-primary-500 to-primary-700';
}

/**
 * Get track shadow
 */
export function getTrackShadow(trackId: string) {
  const shadow = shadows.tracks[trackId as keyof typeof shadows.tracks];
  return shadow || shadows.lg;
}
