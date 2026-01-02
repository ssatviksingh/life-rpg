import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quest } from '../types/models';
import { calculateXP } from '../utils/xp';
import { usePlayerStore } from './playerStore';
import { useStreakStore } from './streakStore';

interface QuestState {
    quests: Quest[];
    setQuests: (list: Quest[]) => void;
    completeQuest: (id: string) => void;
    skipQuest: (id: string) => void;
}

export const useQuestStore = create<QuestState>()(
    persist(
        (set, get) => ({
            quests: [],

            setQuests: (list) => set({ quests: list }),

            completeQuest: (id) => {
                const player = usePlayerStore.getState();

                if (player.restDay) return;

                const quest = get().quests.find((q) => q.id === id);
                if (!quest || quest.status !== 'active') return;

                const xp = calculateXP(quest.difficulty);
                const staminaCost = quest.difficulty <= 2 ? -5 : -10;

                usePlayerStore.getState().addXP(xp);
                usePlayerStore.getState().adjustStamina(staminaCost);
                useStreakStore.getState().registerCompletion();

                set((state) => ({
                    quests: state.quests.map((q) =>
                        q.id === id ? { ...q, status: 'completed' } : q
                    ),
                }));
            },

            skipQuest: (id) =>
                set((state) => ({
                    quests: state.quests.map((q) =>
                        q.id === id ? { ...q, status: 'skipped' } : q
                    ),
                })),
        }),
        {
            name: 'quest-store',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
