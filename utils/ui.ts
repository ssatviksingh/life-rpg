// Light theme palette
const lightPalette = {
    // Premium gradient backgrounds
    appBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    surface: 'rgba(255, 255, 255, 0.96)',
    surfaceElevated: 'rgba(255, 255, 255, 0.99)',
    surfaceOverlay: 'rgba(255, 255, 255, 0.85)',
    surfaceGlass: 'rgba(255, 255, 255, 0.12)',

    // Sophisticated text hierarchy
    inkStrong: '#0f172a',
    ink: '#1e293b',
    inkMuted: '#64748b',
    inkLight: '#94a3b8',
    inkSubtle: '#cbd5e1',

    // Premium accent colors with depth
    accentPrimary: '#4f46e5',
    accentSecondary: '#0891b2',
    accentTertiary: '#7c3aed',
    accentSuccess: '#059669',
    accentWarning: '#d97706',
    accentError: '#dc2626',
    accentMuted: '#e0e7ff',

    // Enhanced gradients with multiple stops
    gradientPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    gradientSecondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
    gradientSuccess: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
    gradientWarning: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #fcd34d 100%)',
    gradientTertiary: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%)',
    gradientAccent: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)',

    // Premium borders and shadows
    divider: 'rgba(15, 23, 42, 0.08)',
    dividerLight: 'rgba(15, 23, 42, 0.04)',
    dividerStrong: 'rgba(15, 23, 42, 0.12)',
    shadow: 'rgba(15, 23, 42, 0.08)',
    shadowLight: 'rgba(15, 23, 42, 0.04)',
    shadowElevated: 'rgba(15, 23, 42, 0.16)',
    shadowDeep: 'rgba(15, 23, 42, 0.24)',

    // Interactive states
    hover: 'rgba(79, 70, 229, 0.04)',
    active: 'rgba(79, 70, 229, 0.08)',
    pressed: 'rgba(79, 70, 229, 0.12)',
};

// Dark theme palette
const darkPalette = {
    // Premium dark gradient backgrounds
    appBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #7c3aed 70%, #a855f7 100%)',
    surface: 'rgba(15, 23, 42, 0.96)',
    surfaceElevated: 'rgba(30, 41, 59, 0.98)',
    surfaceOverlay: 'rgba(15, 23, 42, 0.85)',
    surfaceGlass: 'rgba(15, 23, 42, 0.15)',

    // Sophisticated dark text hierarchy
    inkStrong: '#f8fafc',
    ink: '#e2e8f0',
    inkMuted: '#94a3b8',
    inkLight: '#64748b',
    inkSubtle: '#475569',

    // Premium dark accent colors
    accentPrimary: '#6366f1',
    accentSecondary: '#06b6d4',
    accentTertiary: '#8b5cf6',
    accentSuccess: '#10b981',
    accentWarning: '#f59e0b',
    accentError: '#ef4444',
    accentMuted: '#1e1b4b',

    // Enhanced dark gradients
    gradientPrimary: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #7c3aed 70%, #a855f7 100%)',
    gradientSecondary: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 30%, #c084fc 70%, #e879f9 100%)',
    gradientSuccess: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #34d399 70%, #6ee7b7 100%)',
    gradientWarning: 'linear-gradient(135deg, #d97706 0%, #f59e0b 30%, #fbbf24 70%, #fcd34d 100%)',
    gradientTertiary: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 30%, #8b5cf6 70%, #a855f7 100%)',
    gradientAccent: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 30%, #22d3ee 70%, #67e8f9 100%)',

    // Premium dark borders and shadows
    divider: 'rgba(248, 250, 252, 0.08)',
    dividerLight: 'rgba(248, 250, 252, 0.04)',
    dividerStrong: 'rgba(248, 250, 252, 0.12)',
    shadow: 'rgba(0, 0, 0, 0.25)',
    shadowLight: 'rgba(0, 0, 0, 0.15)',
    shadowElevated: 'rgba(0, 0, 0, 0.35)',
    shadowDeep: 'rgba(0, 0, 0, 0.45)',

    // Dark interactive states
    hover: 'rgba(99, 102, 241, 0.06)',
    active: 'rgba(99, 102, 241, 0.12)',
    pressed: 'rgba(99, 102, 241, 0.18)',
};

export const getPalette = (isDark: boolean) => isDark ? darkPalette : lightPalette;

// Default to light theme for backward compatibility
export const palette = lightPalette;
  
  export const spacing = {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
    xxxxl: 96,
  };

  export const radius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    full: 9999,
  };
  