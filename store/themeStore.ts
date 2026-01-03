import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      isDark: false,

      setThemeMode: (mode: ThemeMode) => {
        // For React Native, we don't need to calculate isDark here
        // The ThemeContext will handle the actual theme calculation
        set({ mode });
      },

      toggleDarkMode: () => {
        const currentMode = get().mode;
        if (currentMode === 'system') {
          // If system, toggle to dark
          set({ mode: 'dark' });
        } else if (currentMode === 'dark') {
          // If dark, toggle to light
          set({ mode: 'light' });
        } else {
          // If light, toggle to dark
          set({ mode: 'dark' });
        }
      },
    }),
    {
      name: 'theme-storage',
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    }
  )
);
