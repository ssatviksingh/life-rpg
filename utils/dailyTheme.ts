export type DailyTheme =
  | 'Gentle Start'
  | 'Momentum Day'
  | 'Recovery Day'
  | 'Quiet Progress'
  | 'Reset Day';

const THEMES: DailyTheme[] = [
  'Gentle Start',
  'Momentum Day',
  'Recovery Day',
  'Quiet Progress',
  'Reset Day',
];

export const getDailyTheme = (): DailyTheme => {
  const key = new Date().toISOString().split('T')[0];
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  return THEMES[Math.abs(hash) % THEMES.length];
};

export const themeAccent: Record<DailyTheme, string> = {
  'Gentle Start': '#5FB3A2',
  'Momentum Day': '#6B7CFF',
  'Recovery Day': '#9A8CFF',
  'Quiet Progress': '#4FA3A3',
  'Reset Day': '#BFAE8F',
};
