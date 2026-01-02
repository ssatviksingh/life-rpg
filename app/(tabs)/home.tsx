import { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp, SlideInRight } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { palette, spacing, radius } from "../../utils/ui";
import { getDailyTheme, themeAccent } from "../../utils/dailyTheme";
import { getDailyCompanionLine } from "../../data/companionLines";
import { usePlayerStore } from "../../store/playerStore";
import { useQuestStore } from "../../store/questStore";
import { useCompanionStore } from "../../store/companionStore";
import { CompanionOrb } from "../../components/CompanionOrb";
import { ProgressBar } from "../../components/ProgressBar";
import { getXPToNextLevel, getCurrentLevelXP } from "../../utils/xp";

export default function HomeScreen() {
  const theme = getDailyTheme();
  const accent = themeAccent[theme];
  const companion = getDailyCompanionLine();

  const { stamina, level, xp, restDay, naturalRecovery, takeRestDay } =
    usePlayerStore();
  const quests = useQuestStore((s) => s.quests);
  const active = quests.filter((q) => q.status === "active").length;
  const { affection, getStaminaRegenBonus } = useCompanionStore();
  const staminaBonus = getStaminaRegenBonus();

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
            <Text style={styles.ringValue}>{stamina}</Text>
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
});
