import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quest } from '../types/models';
import { calculateXP } from '../utils/xp';
import { usePlayerStore } from './playerStore';
import { useStreakStore } from './streakStore';
import { useAchievementStore } from './achievementStore';
import { useCompanionStore } from './companionStore';
import { generateDailyQuests } from '../utils/questGenerator';
import { todayISO } from '../utils/dates';
import { soundManager } from '../utils/soundManager';

interface QuestState {
    quests: Quest[];
    lastGeneratedDate: string | null;
    setQuests: (list: Quest[]) => void;
    completeQuest: (id: string) => void;
    skipQuest: (id: string) => void;
    regenerateDailyQuests: () => void;
    resetQuests: () => void;
}

export const useQuestStore = create<QuestState>()(
    persist(
        (set, get) => ({
            quests: [],
            lastGeneratedDate: null,

            setQuests: (list) => set({
                quests: list,
                lastGeneratedDate: todayISO()
            }),

            regenerateDailyQuests: () => {
                const today = todayISO();
                const lastGenerated = get().lastGeneratedDate;

                if (!lastGenerated || lastGenerated !== today) {
                    set({
                        quests: generateDailyQuests(),
                        lastGeneratedDate: today
                    });
                }
            },

            completeQuest: (id) => {
                const currentPlayer = usePlayerStore.getState();
                const companionBonus = useCompanionStore.getState().getAffectionBonus();

                if (currentPlayer.restDay) return;

                const quest = get().quests.find((q) => q.id === id);
                if (!quest || quest.status !== 'active') return;

                const xp = quest.xpReward;
                const staminaCost = -quest.energyCost;

                usePlayerStore.getState().addXP(xp, companionBonus);
                usePlayerStore.getState().adjustStamina(staminaCost);
                useStreakStore.getState().registerCompletion();

                // Play success sound
                soundManager.playSound('success');

                // Check for achievements
                const player = usePlayerStore.getState();
                const streak = useStreakStore.getState();
                const totalCompletedQuests = get().quests.filter(q => q.status === 'completed').length + 1;

                useAchievementStore.getState().checkAchievements({
                    level: player.level,
                    totalQuestsCompleted: totalCompletedQuests,
                    currentStreak: streak.current,
                    totalXP: player.xp + xp,
                });

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

            resetQuests: () => {
                set({
                    quests: [],
                    lastGeneratedDate: null
                });
            },
        }),
        {
            name: 'quest-store',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
