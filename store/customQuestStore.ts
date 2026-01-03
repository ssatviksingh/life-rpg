import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quest, QuestCategory } from '../types/models';

interface CustomQuestState {
  customQuests: Quest[];
  addCustomQuest: (quest: Omit<Quest, 'id' | 'status'>) => void;
  removeCustomQuest: (id: string) => void;
  completeCustomQuest: (id: string) => void;
  repeatCustomQuest: (id: string) => void;
  resetCustomQuests: () => void;
}

export const useCustomQuestStore = create<CustomQuestState>()(
  persist(
    (set, get) => ({
      customQuests: [],

      addCustomQuest: (questData) => {
        const newQuest: Quest = {
          ...questData,
          id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          status: 'active',
        };

        set((state) => ({
          customQuests: [...state.customQuests, newQuest],
        }));
      },

      removeCustomQuest: (id) => {
        set((state) => ({
          customQuests: state.customQuests.filter((quest) => quest.id !== id),
        }));
      },

      completeCustomQuest: (id) => {
        set((state) => ({
          customQuests: state.customQuests.map((quest) =>
            quest.id === id ? { ...quest, status: 'completed' } : quest
          ),
        }));
      },

      repeatCustomQuest: (id) => {
        set((state) => ({
          customQuests: state.customQuests.map((quest) =>
            quest.id === id ? { ...quest, status: 'active' } : quest
          ),
        }));
      },

      resetCustomQuests: () => {
        set({ customQuests: [] });
      },
    }),
    {
      name: 'custom-quests-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
