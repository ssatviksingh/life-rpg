import { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp, SlideInRight } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { spacing, radius } from "../../utils/ui";
import { getDailyTheme, themeAccent } from "../../utils/dailyTheme";
import { getDailyCompanionLine } from "../../data/companionLines";
import { usePlayerStore } from "../../store/playerStore";
import { useQuestStore } from "../../store/questStore";
import { useStreakStore } from "../../store/streakStore";
import { useCompanionStore } from "../../store/companionStore";
import { useAchievementStore } from "../../store/achievementStore";
import { useTheme } from "../../contexts/ThemeContext";
import { palette as defaultPalette } from "../../utils/ui";
import { CompanionOrb } from "../../components/CompanionOrb";
import { ProgressBar } from "../../components/ProgressBar";
import { AchievementBadge } from "../../components/AchievementBadge";
import { getXPToNextLevel, getCurrentLevelXP } from "../../utils/xp";

export default function HomeScreen() {
  const router = useRouter();
  const { palette } = useTheme(); // Use dynamic theme palette
  const { stamina, level, xp, restDay, naturalRecovery, takeRestDay } =
    usePlayerStore();
  const quests = useQuestStore((s) => s.quests);
  const active = quests.filter((q) => q.status === "active").length;
  const completedToday = quests.filter((q) => q.status === "completed").length;
  const { current: streak } = useStreakStore();
  const { affection, getStaminaRegenBonus } = useCompanionStore();
  const staminaBonus = getStaminaRegenBonus();
  const { achievements } = useAchievementStore();

  const theme = getDailyTheme();
  const accent = themeAccent[theme];
  const completedQuests = quests.filter((q) => q.status === "completed").length;
  const companion = getDailyCompanionLine(level, streak, completedQuests);

  // Calculate XP progress
  const currentLevelXP = getCurrentLevelXP(level, xp);
  const xpToNext = getXPToNextLevel(level);
  const xpProgress = currentLevelXP / xpToNext;

  // Natural stamina recovery every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      naturalRecovery();
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [naturalRecovery]);

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
          {/* HERO SECTION */}
          <Animated.View
            style={[styles.hero, { borderLeftColor: accent }]}
            entering={FadeInUp.delay(200)}
          >
            {/* Top Row: Companion and Stats */}
            <Animated.View
              style={styles.heroTop}
              entering={SlideInRight.delay(400)}
            >
              <CompanionOrb level={level} />

              <View style={styles.stats}>
                <Text style={styles.statLabel}>Level</Text>
                <Text style={styles.statValue}>{level}</Text>

                <Text style={[styles.statLabel, { marginTop: spacing.sm }]}>
                  Active Quests
                </Text>
                <Text style={styles.statValue}>{active}</Text>
              </View>
            </Animated.View>

            {/* Companion Affection */}
            <View style={styles.affectionContainer}>
              <View style={styles.affectionHeader}>
                <Text style={styles.affectionLabel}>Companion Affection</Text>
                <Text style={styles.affectionValue}>{affection}/100</Text>
              </View>
              <ProgressBar
                progress={affection / 100}
                height={6}
                color="#10B981"
                backgroundColor={palette.surface}
              />
              {staminaBonus > 0 && (
                <Text style={styles.affectionBonus}>
                  +{staminaBonus} stamina regen
                </Text>
              )}
            </View>

            {/* XP Progress */}
            <View style={styles.xpContainer}>
              <View style={styles.xpHeader}>
                <Text style={styles.xpLabel}>XP Progress</Text>
                <Text style={styles.xpValue}>
                  {currentLevelXP}/{xpToNext}
                </Text>
              </View>
              <ProgressBar
                progress={xpProgress}
                height={8}
                color={accent}
                backgroundColor={palette.surface}
              />
            </View>

            {/* Energy Ring */}
            <View
              style={[
                styles.ring,
                { borderColor: accent },
                stamina < 20 && styles.ringLow,
                stamina >= 80 && styles.ringHigh,
              ]}
            >
              <Text style={styles.ringValue}>{Math.round(stamina)}</Text>
              <Text style={styles.ringLabel}>
                {stamina < 20
                  ? "Low Energy"
                  : stamina >= 80
                  ? "High Energy"
                  : "Energy"}
              </Text>
            </View>

            {/* Theme and Companion Text */}
            <Text style={[styles.theme, { color: accent }]}>{theme}</Text>
            <Text style={styles.companion}>{companion}</Text>

            {/* Rest Day Button */}
            {stamina < 30 && !restDay && (
              <Pressable
                style={[styles.restButton, { borderColor: accent }]}
                onPress={() => {
                  takeRestDay();
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }}
              >
                <Text style={[styles.restButtonText, { color: accent }]}>
                  Take Rest Day (+25 Energy)
                </Text>
              </Pressable>
            )}
          </Animated.View>

          {/* SECONDARY PANELS */}
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Today's Focus</Text>
            <Text style={styles.panelBody}>
              Small actions reinforce long-term systems.
            </Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>System Status</Text>
            <Text style={styles.panelMeta}>Stable · No pressure</Text>
          </View>

          {/* Quick Actions */}
          <Animated.View
            style={styles.quickActions}
            entering={FadeInUp.delay(800)}
          >
            <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
            <View style={styles.actionGrid}>
              <Pressable
                style={styles.actionButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/quests");
                }}
              >
                <Text style={styles.actionIcon}>📝</Text>
                <Text style={styles.actionText}>Add Quest</Text>
              </Pressable>
              <Pressable
                style={styles.actionButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/character");
                }}
              >
                <Text style={styles.actionIcon}>⭐</Text>
                <Text style={styles.actionText}>View Skills</Text>
              </Pressable>
              <Pressable
                style={styles.actionButton}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  router.push("/insights");
                }}
              >
                <Text style={styles.actionIcon}>📊</Text>
                <Text style={styles.actionText}>Insights</Text>
              </Pressable>
            </View>
          </Animated.View>

          {/* Daily Progress Summary */}
          <Animated.View
            style={styles.progressSummary}
            entering={FadeInUp.delay(1000)}
          >
            <Text style={styles.sectionTitle}>📈 Today's Progress</Text>
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressNumber}>{completedToday}</Text>
                <Text style={styles.progressLabel}>Completed</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressNumber}>{active}</Text>
                <Text style={styles.progressLabel}>Active</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressNumber}>{streak}</Text>
                <Text style={styles.progressLabel}>Day Streak</Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressNumber}>{level}</Text>
                <Text style={styles.progressLabel}>Level</Text>
              </View>
            </View>
          </Animated.View>

          {/* Recent Achievement Spotlight */}
          {(() => {
            const recentAchievements = achievements
              .filter((a) => a.unlocked)
              .sort((a, b) => {
                // Sort by most recently unlocked (this is approximate)
                return b.id.localeCompare(a.id);
              })
              .slice(0, 1); // Show only the most recent

            return recentAchievements.length > 0 ? (
              <Animated.View
                style={styles.achievementSpotlight}
                entering={FadeInUp.delay(1200)}
              >
                <Text style={styles.sectionTitle}>🏆 Recent Achievement</Text>
                <AchievementBadge achievement={recentAchievements[0]} />
              </Animated.View>
            ) : null;
          })()}

          {/* Motivational Insight */}
          <Animated.View
            style={styles.insightCard}
            entering={FadeInUp.delay(1400)}
          >
            <Text style={styles.insightEmoji}>
              {streak >= 7 ? "🌟" : level >= 5 ? "💪" : "🌱"}
            </Text>
            <Text style={styles.insightText}>
              {streak >= 7
                ? "Your consistency is building something extraordinary."
                : level >= 5
                ? "Every step forward creates lasting change."
                : "Growth happens one small action at a time."}
            </Text>
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

  hero: {
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: palette.accentPrimary,
    shadowColor: palette.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  heroTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  stats: {
    alignItems: "flex-end",
  },

  statLabel: {
    fontSize: 12,
    color: palette.inkMuted,
  },

  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: palette.inkStrong,
  },

  ring: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.lg,
  },

  ringValue: {
    fontSize: 36,
    fontWeight: "700",
    color: palette.inkStrong,
  },

  ringLabel: {
    fontSize: 12,
    color: palette.inkMuted,
    marginTop: 4,
  },

  ringLow: {
    borderColor: "#EF4444", // red for low energy
  },

  ringHigh: {
    borderColor: "#10B981", // green for high energy
  },

  affectionContainer: {
    marginTop: spacing.lg,
    width: "100%",
  },

  affectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },

  affectionLabel: {
    fontSize: 12,
    color: palette.inkMuted,
  },

  affectionValue: {
    fontSize: 12,
    color: palette.ink,
    fontWeight: "600",
  },

  affectionBonus: {
    fontSize: 10,
    color: "#10B981",
    marginTop: spacing.xs / 2,
    textAlign: "center",
  },

  xpContainer: {
    marginTop: spacing.lg,
    width: "100%",
  },

  xpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },

  xpLabel: {
    fontSize: 12,
    color: palette.inkMuted,
  },

  xpValue: {
    fontSize: 12,
    color: palette.ink,
    fontWeight: "600",
  },

  theme: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: spacing.sm,
  },

  companion: {
    fontSize: 14,
    color: palette.inkMuted,
    marginTop: spacing.xs,
    maxWidth: "85%",
  },

  restButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderRadius: radius.lg,
    backgroundColor: palette.surface,
  },

  restButtonText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  panel: {
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.lg,
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

  panelTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: palette.ink,
  },

  panelBody: {
    fontSize: 13,
    color: palette.inkMuted,
    marginTop: spacing.xs,
  },

  panelMeta: {
    fontSize: 12,
    color: palette.inkMuted,
    marginTop: spacing.sm,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: spacing.md,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  quickActions: {
    marginTop: spacing.xl,
  },

  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },

  actionButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  actionIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },

  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },

  progressSummary: {
    marginTop: spacing.xl,
  },

  progressStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: radius.lg,
    padding: spacing.lg,
  },

  progressStat: {
    alignItems: "center",
    flex: 1,
  },

  progressNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  progressLabel: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: spacing.xs,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "600",
  },

  achievementSpotlight: {
    marginTop: spacing.xl,
  },

  insightCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  insightEmoji: {
    fontSize: 32,
    marginRight: spacing.md,
  },

  insightText: {
    flex: 1,
    fontSize: 14,
    color: "white",
    fontWeight: "500",
    lineHeight: 20,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
