import { DailyTheme } from './dailyTheme';

export const baseColors = {
    background: '#F6F7F5', // warm off-white
    card: '#FFFFFF',
    cardSoft: '#F1F3F1',
    textPrimary: '#1F2933',
    textSecondary: '#6B7280',
    divider: '#E5E7EB',
};

export const accentByTheme: Record<DailyTheme, string> = {
    'Gentle Start': '#7FAF9B',     // sage green
    'Momentum Day': '#6B8FD6',    // muted blue
    'Recovery Day': '#A5A6D6',    // warm lavender
    'Quiet Progress': '#6FAFB3',  // calm teal
    'Reset Day': '#D6C6A5',       // sand beige
};
