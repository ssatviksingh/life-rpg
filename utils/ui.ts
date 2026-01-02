// Light theme palette
const lightPalette = {
    // Modern gradient backgrounds
    appBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    surface: 'rgba(255, 255, 255, 0.95)',
    surfaceElevated: 'rgba(255, 255, 255, 0.98)',
    surfaceOverlay: 'rgba(255, 255, 255, 0.8)',

    // Professional text colors
    inkStrong: '#1a202c',
    ink: '#2d3748',
    inkMuted: '#718096',
    inkLight: '#a0aec0',

    // Vibrant accent colors
    accentPrimary: '#6366f1',      // Indigo
    accentSecondary: '#06b6d4',    // Cyan
    accentTertiary: '#8b5cf6',     // Purple
    accentSuccess: '#10b981',      // Emerald
    accentWarning: '#f59e0b',      // Amber
    accentError: '#ef4444',        // Red

    // Modern gradients
    gradientPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradientSecondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    gradientSuccess: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    gradientWarning: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',

    // Subtle borders and dividers
    divider: 'rgba(0,0,0,0.08)',
    dividerLight: 'rgba(0,0,0,0.04)',
    shadow: 'rgba(0,0,0,0.1)',
    shadowLight: 'rgba(0,0,0,0.05)',
};

// Dark theme palette
const darkPalette = {
    // Modern gradient backgrounds
    appBg: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
    surface: 'rgba(30, 30, 30, 0.95)',
    surfaceElevated: 'rgba(45, 45, 45, 0.98)',
    surfaceOverlay: 'rgba(30, 30, 30, 0.8)',

    // Professional text colors
    inkStrong: '#ffffff',
    ink: '#f8f9fa',
    inkMuted: '#adb5bd',
    inkLight: '#6c757d',

    // Vibrant accent colors (same for consistency)
    accentPrimary: '#6366f1',      // Indigo
    accentSecondary: '#06b6d4',    // Cyan
    accentTertiary: '#8b5cf6',     // Purple
    accentSuccess: '#10b981',      // Emerald
    accentWarning: '#f59e0b',      // Amber
    accentError: '#ef4444',        // Red

    // Modern gradients (darker versions)
    gradientPrimary: 'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
    gradientSecondary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradientSuccess: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    gradientWarning: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',

    // Subtle borders and dividers
    divider: 'rgba(255,255,255,0.1)',
    dividerLight: 'rgba(255,255,255,0.05)',
    shadow: 'rgba(0,0,0,0.3)',
    shadowLight: 'rgba(0,0,0,0.15)',
};

export const getPalette = (isDark: boolean) => isDark ? darkPalette : lightPalette;

// Default to light theme for backward compatibility
export const palette = lightPalette;
  
  export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  };

  export const radius = {
    sm: 6,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  };
  