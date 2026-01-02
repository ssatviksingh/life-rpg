import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { todayISO, daysBetween } from '../utils/dates';

interface StreakState {
    current: number;
    lastCompletedDate: string | null;
    registerCompletion: () => void;
    resetStreak: () => void;
}

export const useStreakStore = create<StreakState>()(
    persist(
        (set, get) => ({
            current: 0,
            lastCompletedDate: null,

            registerCompletion: () => {
                const today = todayISO();
                const last = get().lastCompletedDate;

                if (!last) {
                    set({ current: 1, lastCompletedDate: today });
                    return;
                }

                const diff = daysBetween(last, today);

                if (diff === 0) return;
                if (diff === 1) {
                    set({ current: get().current + 1, lastCompletedDate: today });
                    return;
                }

                set({ current: 1, lastCompletedDate: today });
            },

            resetStreak: () => {
                set({
                    current: 0,
                    lastCompletedDate: null
                });
            },
        }),
        {
            name: 'streak-store',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
