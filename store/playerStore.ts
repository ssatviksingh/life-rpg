import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Player } from '../types/models';
import { getXPToNextLevel } from '../utils/xp';

interface PlayerState extends Player {
    restDay: boolean;
    addXP: (amount: number) => void;
    handleLevelUp: () => void;
    adjustStamina: (amount: number) => void;
    recoverFromRest: () => void;
}

export const usePlayerStore = create<PlayerState>()(
    persist(
        (set, get) => ({
            level: 1,
            xp: 0,
            stamina: 100,
            restDay: false,

            addXP: (amount) => {
                set((state) => ({ xp: state.xp + amount }));
                get().handleLevelUp();
            },

            handleLevelUp: () => {
                let { xp, level } = get();
                let needed = getXPToNextLevel(level);

                while (xp >= needed) {
                    xp -= needed;
                    level += 1;
                    needed = getXPToNextLevel(level);
                }

                set({ xp, level });
            },

            adjustStamina: (amount) => {
                const stamina = Math.max(0, Math.min(100, get().stamina + amount));
                set({
                    stamina,
                    restDay: stamina < 20,
                });
            },

            recoverFromRest: () => {
                set({
                    stamina: Math.min(100, get().stamina + 30),
                    restDay: false,
                });
            },
        }),
        {
            name: 'player-store',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
