import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { soundManager } from '../utils/soundManager';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
  category: 'quests' | 'level' | 'streak' | 'health' | 'social';
}

interface AchievementState {
  achievements: Achievement[];
  checkAchievements: (stats: {
    level: number;
    totalQuestsCompleted: number;
    currentStreak: number;
    totalXP: number;
  }) => Achievement[];
  getUnlockedAchievements: () => Achievement[];
  getRecentAchievements: () => Achievement[];
  resetAchievements: () => void;
}

const initialAchievements: Achievement[] = [
  // Quest-based achievements
  {
    id: 'first-quest',
    title: 'Quest Beginner',
    description: 'Complete your first quest',
    icon: '🎯',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'quests',
  },
  {
    id: 'quest-novice',
    title: 'Quest Novice',
    description: 'Complete 10 quests',
    icon: '⚔️',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    category: 'quests',
  },
  {
    id: 'quest-expert',
    title: 'Quest Expert',
    description: 'Complete 50 quests',
    icon: '🏆',
    unlocked: false,
    progress: 0,
    maxProgress: 50,
    category: 'quests',
  },
  {
    id: 'quest-master',
    title: 'Quest Master',
    description: 'Complete 100 quests',
    icon: '👑',
    unlocked: false,
    progress: 0,
    maxProgress: 100,
    category: 'quests',
  },

  // Level-based achievements
  {
    id: 'level-5',
    title: 'Apprentice',
    description: 'Reach level 5',
    icon: '⭐',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    category: 'level',
  },
  {
    id: 'level-10',
    title: 'Journeyman',
    description: 'Reach level 10',
    icon: '🌟',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    category: 'level',
  },
  {
    id: 'level-25',
    title: 'Hero',
    description: 'Reach level 25',
    icon: '⚡',
    unlocked: false,
    progress: 0,
    maxProgress: 25,
    category: 'level',
  },

  // Streak achievements
  {
    id: 'streak-3',
    title: 'Getting Started',
    description: 'Maintain a 3-day streak',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    category: 'streak',
  },
  {
    id: 'streak-7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    category: 'streak',
  },
  {
    id: 'streak-30',
    title: 'Monthly Champion',
    description: 'Maintain a 30-day streak',
    icon: '🏅',
    unlocked: false,
    progress: 0,
    maxProgress: 30,
    category: 'streak',
  },
];

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: initialAchievements,

      checkAchievements: (stats) => {
        const currentAchievements = get().achievements;
        const newlyUnlocked: Achievement[] = [];

        const updatedAchievements = currentAchievements.map(achievement => {
          if (achievement.unlocked) return achievement;

          let newProgress = achievement.progress;

          // Update progress based on stats
          switch (achievement.id) {
            case 'first-quest':
            case 'quest-novice':
            case 'quest-expert':
            case 'quest-master':
              newProgress = Math.min(stats.totalQuestsCompleted, achievement.maxProgress);
              break;
            case 'level-5':
            case 'level-10':
            case 'level-25':
              newProgress = Math.min(stats.level, achievement.maxProgress);
              break;
            case 'streak-3':
            case 'streak-7':
            case 'streak-30':
              newProgress = Math.min(stats.currentStreak, achievement.maxProgress);
              break;
          }

          const wasUnlocked = achievement.unlocked;
          const nowUnlocked = newProgress >= achievement.maxProgress;

          if (nowUnlocked && !wasUnlocked) {
            newlyUnlocked.push({
              ...achievement,
              unlocked: true,
              progress: newProgress,
              unlockedAt: new Date().toISOString(),
            });
          }

          return {
            ...achievement,
            progress: newProgress,
            unlocked: nowUnlocked,
            unlockedAt: nowUnlocked ? new Date().toISOString() : undefined,
          };
        });

        set({ achievements: updatedAchievements });

        // Play achievement sound if any new achievements were unlocked
        if (newlyUnlocked.length > 0) {
          soundManager.playSound('achievement');
        }

        return newlyUnlocked;
      },

      getUnlockedAchievements: () => {
        return get().achievements.filter(a => a.unlocked);
      },

      getRecentAchievements: () => {
        return get().achievements
          .filter(a => a.unlocked && a.unlockedAt)
          .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
          .slice(0, 3);
      },

      resetAchievements: () => {
        set({
          achievements: initialAchievements
        });
      },
    }),
    {
      name: 'achievement-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
