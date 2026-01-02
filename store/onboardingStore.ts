import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingState {
  hasCompletedOnboarding: boolean;
  currentStep: number;
  completeOnboarding: () => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      hasCompletedOnboarding: false,
      currentStep: 0,

      completeOnboarding: () => {
        set({ hasCompletedOnboarding: true });
      },

      nextStep: () => {
        const current = get().currentStep;
        if (current < onboardingSteps.length - 1) {
          set({ currentStep: current + 1 });
        } else {
          get().completeOnboarding();
        }
      },

      previousStep: () => {
        const current = get().currentStep;
        if (current > 0) {
          set({ currentStep: current - 1 });
        }
      },

      reset: () => {
        set({ hasCompletedOnboarding: false, currentStep: 0 });
      },
    }),
    {
      name: 'onboarding-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const onboardingSteps = [
  {
    title: "Welcome to Life RPG",
    description: "Transform your daily habits into an epic adventure. Complete quests, gain experience, and level up your real life.",
    icon: "🎮"
  },
  {
    title: "Daily Quests",
    description: "Each day brings new challenges. From drinking water to learning new skills, every action earns you XP and builds your character.",
    icon: "📋"
  },
  {
    title: "Energy Management",
    description: "Your energy bar represents your stamina. Complete quests to spend energy, and let it naturally recover over time.",
    icon: "⚡"
  },
  {
    title: "Skill Progression",
    description: "As you level up, unlock new skills that represent your long-term growth and personal development.",
    icon: "🌟"
  },
  {
    title: "Streaks & Insights",
    description: "Maintain daily streaks and discover insights about your habits. Reflect on your progress without pressure.",
    icon: "📊"
  }
];
