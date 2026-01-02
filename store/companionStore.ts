import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CompanionState {
  affection: number; // 0-100
  lastInteraction: string | null;
  interactionCount: number;
  mood: 'happy' | 'neutral' | 'sad';
  bonuses: {
    xpMultiplier: number;
    staminaRegenBonus: number;
  };
}

interface CompanionActions {
  petCompanion: () => void;
  feedCompanion: () => void;
  playWithCompanion: () => void;
  getAffectionBonus: () => number;
  getStaminaRegenBonus: () => number;
  getCurrentMood: () => string;
  reset: () => void;
}

type CompanionStore = CompanionState & CompanionActions;

const initialState: CompanionState = {
  affection: 50,
  lastInteraction: null,
  interactionCount: 0,
  mood: 'neutral',
  bonuses: {
    xpMultiplier: 1.0,
    staminaRegenBonus: 0,
  },
};

export const useCompanionStore = create<CompanionStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      petCompanion: () => {
        const now = new Date().toISOString();
        set((state) => {
          const newAffection = Math.min(state.affection + 5, 100);
          const newInteractionCount = state.interactionCount + 1;

          return {
            affection: newAffection,
            lastInteraction: now,
            interactionCount: newInteractionCount,
            mood: newAffection > 80 ? 'happy' : newAffection > 30 ? 'neutral' : 'sad',
            bonuses: {
              xpMultiplier: 1.0 + (newAffection / 100) * 0.2, // Up to 20% XP bonus
              staminaRegenBonus: Math.floor(newAffection / 10), // Up to 10 stamina regen bonus
            },
          };
        });
      },

      feedCompanion: () => {
        const now = new Date().toISOString();
        set((state) => {
          const newAffection = Math.min(state.affection + 10, 100);
          const newInteractionCount = state.interactionCount + 1;

          return {
            affection: newAffection,
            lastInteraction: now,
            interactionCount: newInteractionCount,
            mood: newAffection > 80 ? 'happy' : newAffection > 30 ? 'neutral' : 'sad',
            bonuses: {
              xpMultiplier: 1.0 + (newAffection / 100) * 0.2,
              staminaRegenBonus: Math.floor(newAffection / 10),
            },
          };
        });
      },

      playWithCompanion: () => {
        const now = new Date().toISOString();
        set((state) => {
          const newAffection = Math.min(state.affection + 8, 100);
          const newInteractionCount = state.interactionCount + 1;

          return {
            affection: newAffection,
            lastInteraction: now,
            interactionCount: newInteractionCount,
            mood: newAffection > 80 ? 'happy' : newAffection > 30 ? 'neutral' : 'sad',
            bonuses: {
              xpMultiplier: 1.0 + (newAffection / 100) * 0.2,
              staminaRegenBonus: Math.floor(newAffection / 10),
            },
          };
        });
      },

      getAffectionBonus: () => {
        return get().bonuses.xpMultiplier;
      },

      getStaminaRegenBonus: () => {
        return get().bonuses.staminaRegenBonus;
      },

      getCurrentMood: () => {
        const state = get();
        return state.mood;
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'companion-storage',
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
