import { ScrollView, Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { palette, spacing } from "../../utils/ui";
import { usePlayerStore } from "../../store/playerStore";
import { useQuestStore } from "../../store/questStore";
import { useStreakStore } from "../../store/streakStore";
import { useAchievementStore } from "../../store/achievementStore";
import { useCompanionStore } from "../../store/companionStore";
import { InsightCard } from "../../components/InsightCard";
import { AchievementBadge } from "../../components/AchievementBadge";
import { ProgressBar } from "../../components/ProgressBar";
import { SimpleChart } from "../../components/SimpleChart";
import { getXPToNextLevel, getCurrentLevelXP } from "../../utils/xp";

export default function InsightsScreen() {
  const { level, xp, stamina } = usePlayerStore();
  const { quests } = useQuestStore();
  const { current: streak } = useStreakStore();
  const { achievements, getRecentAchievements } = useAchievementStore();
  const { affection, interactionCount } = useCompanionStore();

  const hasEnoughData = xp > 0;

  // Calculate quest completion stats
  const completedQuests = quests.filter((q) => q.status === "completed").length;
  const totalQuests = quests.length;
  const completionRate =
    totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0;

  // Calculate category breakdown
  const categoryStats = quests.reduce((acc, quest) => {
    if (!acc[quest.category]) {
      acc[quest.category] = { total: 0, completed: 0 };
    }
    acc[quest.category].total++;
    if (quest.status === "completed") {
      acc[quest.category].completed++;
    }
    return acc;
  }, {} as Record<string, { total: number; completed: number }>);

  const categoryChartData = Object.entries(categoryStats).map(
    ([category, stats]) => ({
      label: category.charAt(0).toUpperCase() + category.slice(1),
      value: stats.completed,
      color: category === "special" ? "#FFD700" : palette.accentPrimary,
    })
  );

  // Calculate weekly progress (mock data for demonstration)
  const weeklyData = [
    { label: "Mon", value: Math.floor(Math.random() * 5) + 1 },
    { label: "Tue", value: Math.floor(Math.random() * 5) + 1 },
    { label: "Wed", value: Math.floor(Math.random() * 5) + 1 },
    { label: "Thu", value: Math.floor(Math.random() * 5) + 1 },
    { label: "Fri", value: Math.floor(Math.random() * 5) + 1 },
    { label: "Sat", value: Math.floor(Math.random() * 5) + 1 },
    { label: "Sun", value: completedQuests % 7 }, // Today's actual progress
  ];

  // Calculate XP progress
  const currentLevelXP = getCurrentLevelXP(level, xp);
  const xpToNext = getXPToNextLevel(level);
  const xpProgress = currentLevelXP / xpToNext;

  // Generate personalized insights
  const getPersonalizedInsights = () => {
    const insights = [];

    // Stamina insights
    if (stamina < 30) {
      insights.push({
        title: "Energy Management",
        body: "Your energy levels are low. Consider taking a rest day or focusing on gentle activities to rebuild your stamina.",
        type: "warning",
      });
    } else if (stamina > 80) {
      insights.push({
        title: "High Energy",
        body: "You're in a great energy state! This is an excellent time to tackle more challenging quests.",
        type: "positive",
      });
    }

    // Streak insights
    if (streak >= 7) {
      insights.push({
        title: "Consistency Champion",
        body: `Amazing! You've maintained a ${streak}-day streak. Your consistency is building real momentum.`,
        type: "positive",
      });
    } else if (streak === 0 && totalQuests > 0) {
      insights.push({
        title: "Getting Started",
        body: "Every journey begins with a single step. Complete a quest today to start building your streak.",
        type: "encouragement",
      });
    }

    // Quest completion insights
    if (completionRate >= 80) {
      insights.push({
        title: "Quest Master",
        body: `You've completed ${Math.round(
          completionRate
        )}% of your quests. Excellent productivity!`,
        type: "positive",
      });
    } else if (completionRate < 50 && totalQuests >= 3) {
      insights.push({
        title: "Quest Progress",
        body: "Consider breaking down larger quests into smaller, more manageable steps to build momentum.",
        type: "suggestion",
      });
    }

    // Level progression insights
    if (xpProgress > 0.8) {
      insights.push({
        title: "Level Up Soon",
        body: "You're very close to leveling up! Just a bit more XP to unlock new abilities.",
        type: "positive",
      });
    }

    return insights;
  };

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
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtle}>
            Light reflections — nothing you need to act on.
          </Text>

          {hasEnoughData ? (
            <>
              {/* Stats Overview */}
              <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{level}</Text>
                  <Text style={styles.statLabel}>Level</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{streak}</Text>
                  <Text style={styles.statLabel}>Day Streak</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>
                    {Math.round(completionRate)}%
                  </Text>
                  <Text style={styles.statLabel}>Completion</Text>
                </View>
              </View>

              {/* XP Progress */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>
                    Level {level} Progress
                  </Text>
                  <Text style={styles.progressValue}>
                    {currentLevelXP}/{xpToNext} XP
                  </Text>
                </View>
                <ProgressBar
                  progress={xpProgress}
                  height={10}
                  color={palette.accentPrimary}
                  backgroundColor={palette.surface}
                />
              </View>

              {/* Performance Charts */}
              <Animated.View
                style={styles.section}
                entering={FadeInUp.delay(500)}
              >
                <Text style={styles.sectionTitle}>
                  📊 Performance Analytics
                </Text>

                {categoryChartData.length > 0 && (
                  <SimpleChart
                    data={categoryChartData}
                    title="Quests Completed by Category"
                    height={180}
                  />
                )}

                <SimpleChart
                  data={weeklyData}
                  title="Weekly Quest Activity"
                  height={180}
                />
              </Animated.View>

              {/* Companion Stats */}
              <Animated.View
                style={[styles.section, styles.companionStatsSection]}
                entering={FadeInUp.delay(600)}
              >
                <Text style={styles.sectionTitle}>💝 Companion Statistics</Text>
                <View style={styles.companionStats}>
                  <View style={styles.companionStat}>
                    <Text style={styles.companionStatValue}>{affection}</Text>
                    <Text style={styles.companionStatLabel}>
                      Affection Level
                    </Text>
                  </View>
                  <View style={styles.companionStat}>
                    <Text style={styles.companionStatValue}>
                      {interactionCount}
                    </Text>
                    <Text style={styles.companionStatLabel}>Interactions</Text>
                  </View>
                  <View style={styles.companionStat}>
                    <Text style={styles.companionStatValue}>
                      {Math.round((affection / 100) * 20)}%
                    </Text>
                    <Text style={styles.companionStatLabel}>XP Bonus</Text>
                  </View>
                </View>
              </Animated.View>

              {/* Personalized Insights */}
              {getPersonalizedInsights().map((insight, index) => (
                <InsightCard
                  key={index}
                  title={insight.title}
                  body={insight.body}
                />
              ))}

              {/* Activity Summary */}
              <InsightCard
                title="Activity Summary"
                body={`This period: ${completedQuests} quests completed out of ${totalQuests} total. Current energy level: ${stamina}/100.`}
              />

              {/* Recent Achievements */}
              {getRecentAchievements().length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    🏆 Recent Achievements
                  </Text>
                  {getRecentAchievements().map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                    />
                  ))}
                </View>
              )}

              {/* Achievement Progress */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🎯 Achievement Progress</Text>
                {achievements
                  .filter((a) => !a.unlocked)
                  .slice(0, 3)
                  .map((achievement) => (
                    <AchievementBadge
                      key={achievement.id}
                      achievement={achievement}
                      showProgress={true}
                    />
                  ))}
              </View>
            </>
          ) : (
            <Text style={styles.subtle}>
              Insights will appear once there's enough activity to reflect on.
            </Text>
          )}
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

  subtle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: 20,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: spacing.lg,
  },

  statCard: {
    backgroundColor: palette.surfaceElevated,
    borderRadius: spacing.md,
    padding: spacing.md,
    alignItems: "center",
    minWidth: 80,
    shadowColor: palette.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.inkStrong,
  },

  statLabel: {
    fontSize: 12,
    color: palette.inkMuted,
    marginTop: spacing.xs,
  },

  progressSection: {
    backgroundColor: palette.surfaceElevated,
    borderRadius: spacing.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: palette.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  progressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.ink,
  },

  progressValue: {
    fontSize: 14,
    color: palette.inkMuted,
  },

  section: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },

  companionStatsSection: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.inkStrong,
    marginBottom: spacing.md,
  },

  companionStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: palette.surface,
    borderRadius: spacing.md,
    padding: spacing.md,
  },

  companionStat: {
    alignItems: "center",
    flex: 1,
  },

  companionStatValue: {
    fontSize: 20,
    fontWeight: "700",
    color: palette.accentPrimary,
  },

  companionStatLabel: {
    fontSize: 12,
    color: palette.inkMuted,
    marginTop: spacing.xs,
    textAlign: "center",
  },
});
