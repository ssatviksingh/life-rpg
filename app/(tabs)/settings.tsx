import { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Pressable,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { spacing, radius, palette as defaultPalette } from "../../utils/ui";
import { useTheme } from "../../contexts/ThemeContext";

// Fallback palette for when theme is not available
const FALLBACK_PALETTE = defaultPalette;
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
    palette: contextPalette,
  } = useTheme();

  // Fallback to default palette if theme is not available
  const themePalette = contextPalette || FALLBACK_PALETTE;

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);

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

  const renderSection = (title: string, options: any[], delay: number = 0) => (
    <Animated.View entering={FadeInUp.delay(delay)}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {options.map((option, index) => (
        <Animated.View
          key={option.title}
          entering={FadeInUp.delay(delay + 100 + index * 50)}
        >
          <Pressable
            style={[styles.optionCard, option.danger && styles.dangerCard]}
            onPress={option.action}
            disabled={option.disabled}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionHeader}>
                <View style={styles.optionTextContainer}>
                  <Text
                    style={[
                      styles.optionTitle,
                      option.danger && styles.dangerText,
                      option.disabled && styles.disabledText,
                    ]}
                  >
                    {option.title}
                  </Text>
                  {option.description && (
                    <Text
                      style={[
                        styles.optionDescription,
                        option.danger && styles.dangerText,
                        option.disabled && styles.disabledText,
                      ]}
                    >
                      {option.description}
                    </Text>
                  )}
                </View>
                {option.hasSwitch && (
                  <Switch
                    value={option.switchValue}
                    onValueChange={option.onSwitchChange}
                    trackColor={{
                      false: themePalette.divider,
                      true: themePalette.accentSecondary,
                    }}
                    thumbColor={option.switchValue ? "#fff" : "#f4f3f4"}
                  />
                )}
                {option.icon && (
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                )}
              </View>
              {option.subtitle && (
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              )}
            </View>
          </Pressable>
        </Animated.View>
      ))}
    </Animated.View>
  );

  const appearanceOptions = [
    {
      title: "Theme",
      description: `Current: ${isDark ? "Dark" : "Light"} Mode`,
      icon: "🎨",
      action: () => {
        Alert.alert("Theme Settings", "Choose your preferred theme", [
          { text: "Light", onPress: () => setThemeMode("light") },
          { text: "Dark", onPress: () => setThemeMode("dark") },
          { text: "System", onPress: () => setThemeMode("system") },
          { text: "Cancel", style: "cancel" },
        ]);
      },
    },
  ];

  const preferencesOptions = [
    {
      title: "Sound Effects",
      description: "Play sounds for actions and achievements",
      icon: "🔊",
      hasSwitch: true,
      switchValue: soundEnabled,
      onSwitchChange: setSoundEnabled,
    },
    {
      title: "Haptic Feedback",
      description: "Vibrate on interactions and completions",
      icon: "📳",
      hasSwitch: true,
      switchValue: hapticsEnabled,
      onSwitchChange: setHapticsEnabled,
    },
    {
      title: "Notifications",
      description: "Reminders for daily quests and streaks",
      icon: "🔔",
      hasSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled,
      disabled: true,
      subtitle: "Coming soon in future updates",
    },
  ];

  const dataOptions = [
    {
      title: "Export Data",
      description: "Download your progress as JSON file",
      icon: "📤",
      action: () => {
        Alert.alert(
          "Coming Soon",
          "Data export feature will be available in a future update!"
        );
      },
      disabled: true,
    },
    {
      title: "Import Data",
      description: "Restore progress from backup file",
      icon: "📥",
      action: () => {
        Alert.alert(
          "Coming Soon",
          "Data import feature will be available in a future update!"
        );
      },
      disabled: true,
    },
  ];

  const supportOptions = [
    {
      title: "About Life RPG",
      description: "Learn more about the app",
      icon: "ℹ️",
      action: () =>
        Alert.alert(
          "About Life RPG",
          "🎮 Life RPG v2.0 - Enhanced Edition\n\nTransform your daily habits into an epic adventure! Level up your life through gamified personal development.\n\n✨ Enhanced Features:\n• Daily Quests & Dynamic Challenges\n• XP System & Advanced Level Progression\n• Interactive Companion Character\n• Advanced Streak Tracking\n• Comprehensive Achievement System\n• Custom Quest Creation\n• Dark/Light Theme Support\n• Sound Effects & Haptic Feedback\n• Progress Analytics & Insights\n• Skill Tree Development\n\n🎯 Mission:\nMake personal growth engaging and sustainable through innovative game mechanics and positive reinforcement.\n\n📱 Technical Excellence:\nBuilt with React Native & Expo\nPowered by cutting-edge mobile technologies\nOptimized for performance and user experience\n\n💝 Made with passion for self-improvement\n\n© 2026 Life RPG Team",
          [{ text: "Got it!" }]
        ),
    },
    {
      title: "Help & Support",
      description: "Get help or report issues",
      icon: "🆘",
      action: () => {
        Alert.alert(
          "Help & Support",
          "For support, please contact us at support@liferpg.app or visit our website for FAQs and tutorials."
        );
      },
    },
    {
      title: "Rate & Review",
      description: "Share your feedback on app stores",
      icon: "⭐",
      action: () => {
        Alert.alert(
          "Rate & Review",
          "Thank you for considering! Your feedback helps us improve Life RPG for everyone."
        );
      },
    },
  ];

  const dangerOptions = [
    {
      title: "Reset All Progress",
      description: "Permanently delete all data and start fresh",
      icon: "⚠️",
      action: handleResetData,
      danger: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
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
            <Text style={styles.title}>⚙️ Settings</Text>
            <Text style={styles.subtitle}>
              Customize your Life RPG adventure
            </Text>

            {renderSection("🎨 Appearance", appearanceOptions, 300)}
            {renderSection("🔧 Preferences", preferencesOptions, 500)}
            {renderSection("💾 Data Management", dataOptions, 700)}
            {renderSection("🆘 Support", supportOptions, 900)}
            {renderSection("⚠️ Danger Zone", dangerOptions, 1100)}
          </Animated.View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginBottom: spacing.sm,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: spacing.xxl,
    lineHeight: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: spacing.md,
    marginTop: spacing.lg,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  optionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: themePalette.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: themePalette.dividerLight,
  },

  dangerCard: {
    borderColor: themePalette.accentError,
    borderWidth: 2,
    backgroundColor: "rgba(255, 236, 236, 0.95)",
  },

  optionContent: {
    flex: 1,
  },

  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  optionTextContainer: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: themePalette.inkStrong,
    marginBottom: spacing.xs,
  },

  optionDescription: {
    fontSize: 14,
    color: themePalette.inkMuted,
    lineHeight: 20,
  },

  optionSubtitle: {
    fontSize: 12,
    color: themePalette.accentTertiary,
    marginTop: spacing.xs,
    fontStyle: "italic",
  },

  optionIcon: {
    fontSize: 20,
    marginLeft: spacing.md,
  },

  dangerText: {
    color: themePalette.accentError,
  },

  disabledText: {
    opacity: 0.5,
  },
});
