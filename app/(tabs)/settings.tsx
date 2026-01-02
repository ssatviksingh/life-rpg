import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Pressable,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { palette, spacing, radius } from "../../utils/ui";
import { useTheme } from "../../contexts/ThemeContext";
import { usePlayerStore } from "../../store/playerStore";
import { useQuestStore } from "../../store/questStore";
import { useStreakStore } from "../../store/streakStore";
import { useAchievementStore } from "../../store/achievementStore";

export default function SettingsScreen() {
  const resetPlayer = usePlayerStore((state) => state.resetPlayer);
  const resetQuests = useQuestStore((state) => state.resetQuests);
  const resetStreak = useStreakStore((state) => state.resetStreak);
  const resetAchievements = useAchievementStore(
    (state) => state.resetAchievements
  );
  const {
    isDark,
    toggleTheme,
    setThemeMode,
    palette: themePalette,
  } = useTheme();

  const handleResetData = () => {
    Alert.alert(
      "Reset All Data",
      "This will permanently delete all your progress, quests, achievements, and streaks. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset Everything",
          style: "destructive",
          onPress: () => {
            resetPlayer();
            resetQuests();
            resetStreak();
            resetAchievements();
            Alert.alert("Data Reset", "All your progress has been reset.");
          },
        },
      ]
    );
  };

  const settingsOptions = [
    {
      title: "Theme",
      description: `Current: ${isDark ? "Dark" : "Light"} Mode`,
      action: () => {
        Alert.alert("Theme Settings", "Choose your preferred theme", [
          { text: "Light", onPress: () => setThemeMode("light") },
          { text: "Dark", onPress: () => setThemeMode("dark") },
          { text: "System", onPress: () => setThemeMode("system") },
          { text: "Cancel", style: "cancel" },
        ]);
      },
    },
    {
      title: "About Life RPG",
      description: "Transform your daily habits into an epic adventure",
      action: () =>
        Alert.alert(
          "About Life RPG",
          "🎮 Life RPG v1.0\n\nTransform your daily habits into an epic adventure! Level up your life through gamified personal development.\n\n✨ Features:\n• Daily Quests & Challenges\n• XP System & Level Progression\n• Companion Character\n• Streak Tracking\n• Achievement System\n• Custom Quest Creation\n• Dark/Light Theme Support\n\n🎯 Purpose:\nMake personal growth engaging and sustainable through game mechanics and positive reinforcement.\n\n📱 Built with React Native & Expo\n💝 Made with passion for self-improvement\n\n© 2026 Life RPG",
          [{ text: "Got it!" }]
        ),
    },
    {
      title: "Reset All Progress",
      description: "Permanently delete all data and start fresh",
      action: handleResetData,
      danger: true,
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={styles.content} entering={FadeInUp.delay(200)}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Customize your Life RPG experience
          </Text>

          {settingsOptions.map((option, index) => (
            <Animated.View
              key={option.title}
              entering={FadeInUp.delay(400 + index * 100)}
            >
              <Pressable
                style={[styles.optionCard, option.danger && styles.dangerCard]}
                onPress={option.action}
              >
                <View style={styles.optionContent}>
                  <Text
                    style={[
                      styles.optionTitle,
                      option.danger && styles.dangerText,
                    ]}
                  >
                    {option.title}
                  </Text>
                  <Text
                    style={[
                      styles.optionDescription,
                      option.danger && styles.dangerText,
                    ]}
                  >
                    {option.description}
                  </Text>
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: spacing.sm,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: 20,
  },

  optionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: spacing.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: palette.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: palette.dividerLight,
  },

  dangerCard: {
    borderColor: palette.accentError,
    borderWidth: 2,
  },

  optionContent: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.inkStrong,
    marginBottom: spacing.xs,
  },

  optionDescription: {
    fontSize: 14,
    color: palette.inkMuted,
    lineHeight: 20,
  },

  dangerText: {
    color: palette.accentError,
  },
});
