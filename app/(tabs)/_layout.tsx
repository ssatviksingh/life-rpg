import { useState, useEffect } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { OnboardingModal } from "../../components/OnboardingModal";
import { AchievementPopup } from "../../components/AchievementPopup";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { useAchievementStore } from "../../store/achievementStore";
import { usePlayerStore } from "../../store/playerStore";
import { useQuestStore } from "../../store/questStore";
import { useStreakStore } from "../../store/streakStore";
import { palette, spacing, radius } from "../../utils/ui";

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

  // Calculate active quest count for badge
  const activeQuests = quests.filter((q) => q.status === "active").length;

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
          headerShown: false,
          tabBarActiveTintColor: "#ffffff",
          tabBarInactiveTintColor: "rgba(255, 255, 255, 0.7)",
          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            height: 75,
            paddingBottom: 8,
            paddingTop: 8,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={["rgba(103, 126, 234, 0.95)", "rgba(118, 75, 162, 0.95)"]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                top: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          ),
          tabBarActiveBackgroundColor: "rgba(255, 255, 255, 0.05)",
          tabBarItemStyle: {
            borderRadius: 16,
            marginHorizontal: 6,
            marginVertical: 4,
            paddingVertical: 2,
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
            marginTop: 2,
          },
          animation: "fade",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.tabIconContainer}>
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size - 2}
                  color={color}
                />
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="quests"
          options={{
            title: "Quests",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.tabIconContainer}>
                <View style={styles.iconWithBadge}>
                  <Ionicons
                    name={focused ? "checkbox" : "checkbox-outline"}
                    size={size - 2}
                    color={color}
                  />
                  {activeQuests > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {activeQuests > 9 ? "9+" : activeQuests}
                      </Text>
                    </View>
                  )}
                </View>
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.tabIconContainer}>
                <Ionicons
                  name={focused ? "analytics" : "analytics-outline"}
                  size={size - 2}
                  color={color}
                />
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="character"
          options={{
            title: "Character",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.tabIconContainer}>
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={size - 2}
                  color={color}
                />
                {level > 1 && (
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelBadgeText}>{level}</Text>
                  </View>
                )}
                {focused && <View style={styles.activeIndicator} />}
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={styles.tabIconContainer}>
                <Ionicons
                  name={focused ? "settings" : "settings-outline"}
                  size={size - 2}
                  color={color}
                />
                {focused && <View style={styles.activeIndicator} />}
              </View>
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

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iconWithBadge: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#EF4444",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(103, 126, 234, 0.95)",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
  },
  levelBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: palette.accentSecondary,
    borderRadius: 6,
    minWidth: 12,
    height: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(103, 126, 234, 0.95)",
  },
  levelBadgeText: {
    color: "white",
    fontSize: 8,
    fontWeight: "700",
    textAlign: "center",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -4,
    width: 20,
    height: 2,
    backgroundColor: "white",
    borderRadius: 1,
  },
});
