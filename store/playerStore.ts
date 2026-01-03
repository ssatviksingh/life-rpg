import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Player } from '../types/models';
import { getXPToNextLevel } from '../utils/xp';
import { useCompanionStore } from './companionStore';
import { soundManager } from '../utils/soundManager';

interface PlayerState extends Player {
    restDay: boolean;
    lastActivityTime: number;
    addXP: (amount: number, multiplier?: number) => void;
    handleLevelUp: () => void;
    adjustStamina: (amount: number) => void;
    recoverFromRest: () => void;
    naturalRecovery: () => void;
    takeRestDay: () => void;
    resetPlayer: () => void;
}

export const usePlayerStore = create<PlayerState>()(
    persist(
        (set, get) => ({
            level: 1,
            xp: 0,
            stamina: 100,
            restDay: false,
            lastActivityTime: Date.now(),

            addXP: (amount, multiplier = 1) => {
                const finalAmount = Math.floor(amount * multiplier);
                set((state) => ({ xp: state.xp + finalAmount }));
                get().handleLevelUp();
            },

            handleLevelUp: () => {
                const currentLevel = get().level;
                let { xp, level } = get();
                let needed = getXPToNextLevel(level);
                const leveledUp = xp >= needed;

                while (xp >= needed) {
                    xp -= needed;
                    level += 1;
                    needed = getXPToNextLevel(level);
                }

                set({ xp, level });

                // Play level up sound if player leveled up
                if (leveledUp && level > currentLevel) {
                    soundManager.playSound('level_up');
                }
            },

            adjustStamina: (amount) => {
                const stamina = Math.max(0, Math.min(100, Math.round(get().stamina + amount)));
                set({
                    stamina,
                    restDay: stamina < 20,
                    lastActivityTime: Date.now(),
                });
            },

            recoverFromRest: () => {
                set({
                    stamina: Math.min(100, Math.round(get().stamina + 30)),
                    restDay: false,
                });
            },

            naturalRecovery: () => {
                const now = Date.now();
                const lastActivity = get().lastActivityTime;
                const hoursSinceActivity = (now - lastActivity) / (1000 * 60 * 60);

                // Recover 1 stamina per hour, up to 5 per day max
                const recoveryAmount = Math.min(Math.floor(hoursSinceActivity * 1), 5);

                if (recoveryAmount > 0) {
                    set((state) => ({
                        stamina: Math.min(100, Math.round(state.stamina + recoveryAmount)),
                        lastActivityTime: now,
                        restDay: Math.round(state.stamina + recoveryAmount) < 20 ? false : state.restDay
                    }));
                }
            },

            takeRestDay: () => {
                set({
                    stamina: Math.min(100, Math.round(get().stamina + 25)),
                    restDay: true,
                    lastActivityTime: Date.now()
                });
            },

            resetPlayer: () => {
                set({
                    level: 1,
                    xp: 0,
                    stamina: 100,
                    restDay: false,
                    lastActivityTime: Date.now()
                });
            },
        }),
        {
            name: 'player-store',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                ...state,
                stamina: Math.round(state.stamina), // Ensure stamina is always saved as integer
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    // Migration: Ensure stamina is always an integer when loaded
                    state.stamina = Math.round(state.stamina);
                    // Also ensure other values are valid
                    state.level = Math.max(1, Math.floor(state.level));
                    state.xp = Math.max(0, Math.floor(state.xp));
                }
            },
        }
    )
);
