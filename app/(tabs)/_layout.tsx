import { useState, useEffect } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { OnboardingModal } from "../../components/OnboardingModal";
import { AchievementPopup } from "../../components/AchievementPopup";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { useAchievementStore } from "../../store/achievementStore";
import { usePlayerStore } from "../../store/playerStore";
import { useQuestStore } from "../../store/questStore";
import { useStreakStore } from "../../store/streakStore";

export default function TabLayout() {
  const [achievementPopup, setAchievementPopup] = useState<{
    title: string;
    description: string;
    icon: string;
  } | null>(null);

  const { checkAchievements } = useAchievementStore();
  const { level, xp } = usePlayerStore();
  const { quests } = useQuestStore();
  const { current: streak } = useStreakStore();

  // Check for achievements on app load and when stats change
  useEffect(() => {
    const totalCompletedQuests = quests.filter(
      (q) => q.status === "completed"
    ).length;

    const newlyUnlocked = checkAchievements({
      level,
      totalQuestsCompleted: totalCompletedQuests,
      currentStreak: streak,
      totalXP: xp,
    });

    if (newlyUnlocked.length > 0) {
      // Show the most recent achievement
      const latest = newlyUnlocked[newlyUnlocked.length - 1];
      setAchievementPopup({
        title: latest.title,
        description: latest.description,
        icon: latest.icon,
      });
    }
  }, [level, xp, quests, streak, checkAchievements]);

  return (
    <ErrorBoundary>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: "#2563EB",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="quests"
          options={{
            title: "Quests",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="checkbox-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="analytics-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="character"
          options={{
            title: "Character",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      <OnboardingModal />
      <AchievementPopup
        achievement={achievementPopup}
        visible={!!achievementPopup}
        onClose={() => setAchievementPopup(null)}
      />
    </ErrorBoundary>
  );
}
