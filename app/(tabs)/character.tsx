import { ScrollView, Text, StyleSheet, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import { palette, spacing, radius } from "../../utils/ui";
import { usePlayerStore } from "../../store/playerStore";
import { SKILL_TREE } from "../../data/skillTree";
import { SkillNode } from "../../components/SkillNode";
import { ProgressBar } from "../../components/ProgressBar";
import { getXPToNextLevel, getCurrentLevelXP } from "../../utils/xp";

export default function CharacterScreen() {
  const { level, xp } = usePlayerStore();

  // Calculate stats
  const unlockedSkills = SKILL_TREE.filter(
    (skill) => level >= skill.requiredLevel
  ).length;
  const totalSkills = SKILL_TREE.length;
  const currentLevelXP = getCurrentLevelXP(level, xp);
  const xpToNext = getXPToNextLevel(level);
  const xpProgress = currentLevelXP / xpToNext;
  const skillProgress = unlockedSkills / totalSkills;

  // Next skill to unlock
  const nextSkill = SKILL_TREE.find((skill) => level < skill.requiredLevel);

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
        {/* Character Header */}
        <Animated.View style={styles.header} entering={FadeInUp.delay(100)}>
          <View style={styles.characterAvatar}>
            <Text style={styles.avatarEmoji}>🧙‍♂️</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{level}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.characterName}>Life Warrior</Text>
            <Text style={styles.characterTitle}>Personal Growth Champion</Text>
          </View>
        </Animated.View>

        {/* Stats Overview */}
        <Animated.View
          style={styles.statsOverview}
          entering={FadeInUp.delay(200)}
        >
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{unlockedSkills}</Text>
            <Text style={styles.statLabel}>Skills Unlocked</Text>
            <ProgressBar
              progress={skillProgress}
              height={4}
              color={palette.accentSecondary}
              backgroundColor={palette.divider}
            />
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{level}</Text>
            <Text style={styles.statLabel}>Current Level</Text>
            <Text style={styles.xpText}>
              {currentLevelXP}/{xpToNext} XP
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {Math.round(skillProgress * 100)}%
            </Text>
            <Text style={styles.statLabel}>Mastery</Text>
            <View style={styles.masteryIndicator}>
              <View
                style={[
                  styles.masteryBar,
                  { width: `${skillProgress * 100}%` },
                ]}
              />
            </View>
          </View>
        </Animated.View>

        {/* XP Progress Bar */}
        <Animated.View style={styles.xpSection} entering={FadeInUp.delay(300)}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpTitle}>Level {level} Progress</Text>
            <Text style={styles.xpValue}>
              {currentLevelXP}/{xpToNext} XP
            </Text>
          </View>
          <ProgressBar
            progress={xpProgress}
            height={8}
            color={palette.accentPrimary}
            backgroundColor={palette.surface}
          />
        </Animated.View>

        {/* Next Skill Preview */}
        {nextSkill && (
          <Animated.View
            style={styles.nextSkillCard}
            entering={FadeInUp.delay(400)}
          >
            <Text style={styles.nextSkillTitle}>🔮 Next Skill</Text>
            <Text style={styles.nextSkillName}>{nextSkill.title}</Text>
            <Text style={styles.nextSkillDesc}>{nextSkill.description}</Text>
            <Text style={styles.nextSkillReq}>
              Requires Level {nextSkill.requiredLevel}
            </Text>
          </Animated.View>
        )}

        {/* Skill Tree Section */}
        <Animated.View
          style={styles.skillTreeSection}
          entering={FadeInUp.delay(500)}
        >
          <Text style={styles.sectionTitle}>🛡️ Skill Tree</Text>
          <Text style={styles.sectionSubtitle}>
            Master these abilities through consistent growth and dedication.
          </Text>

          <View style={styles.skillTree}>
            {SKILL_TREE.map((skill, index) => (
              <Animated.View
                key={skill.id}
                entering={FadeInUp.delay(600 + index * 150)}
                style={styles.skillWrapper}
              >
                <SkillNode
                  skill={skill}
                  unlocked={level >= skill.requiredLevel}
                  currentLevel={level}
                  currentXP={xp}
                />
                {index < SKILL_TREE.length - 1 && (
                  <View style={styles.skillConnector} />
                )}
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Achievement Showcase */}
        <Animated.View
          style={styles.achievementsSection}
          entering={FadeInUp.delay(800)}
        >
          <Text style={styles.achievementTitle}>🏆 Milestones</Text>
          <View style={styles.achievementGrid}>
            <View
              style={[
                styles.achievementBadge,
                unlockedSkills >= 1 && styles.achievementUnlocked,
              ]}
            >
              <Text style={styles.achievementEmoji}>🎯</Text>
              <Text style={styles.achievementText}>First Steps</Text>
            </View>
            <View
              style={[
                styles.achievementBadge,
                unlockedSkills >= 2 && styles.achievementUnlocked,
              ]}
            >
              <Text style={styles.achievementEmoji}>⚡</Text>
              <Text style={styles.achievementText}>Growing Strong</Text>
            </View>
            <View
              style={[
                styles.achievementBadge,
                unlockedSkills >= 3 && styles.achievementUnlocked,
              ]}
            >
              <Text style={styles.achievementEmoji}>🌟</Text>
              <Text style={styles.achievementText}>Path Finder</Text>
            </View>
            <View
              style={[
                styles.achievementBadge,
                unlockedSkills >= 4 && styles.achievementUnlocked,
              ]}
            >
              <Text style={styles.achievementEmoji}>👑</Text>
              <Text style={styles.achievementText}>Master</Text>
            </View>
          </View>
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

  // Character Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: palette.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },

  characterAvatar: {
    position: "relative",
    marginRight: spacing.lg,
  },

  avatarEmoji: {
    fontSize: 48,
  },

  levelBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: palette.accentPrimary,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: palette.surface,
  },

  levelText: {
    color: palette.inkStrong,
    fontSize: 12,
    fontWeight: "700",
  },

  statsContainer: {
    flex: 1,
  },

  characterName: {
    fontSize: 20,
    fontWeight: "700",
    color: palette.ink,
    marginBottom: spacing.xs,
  },

  characterTitle: {
    fontSize: 14,
    color: palette.accentSecondary,
    fontWeight: "600",
  },

  // Stats Overview
  statsOverview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },

  statCard: {
    flex: 1,
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: "center",
    shadowColor: palette.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.accentPrimary,
    marginBottom: spacing.xs,
  },

  statLabel: {
    fontSize: 12,
    color: palette.inkMuted,
    textAlign: "center",
    marginBottom: spacing.sm,
  },

  xpText: {
    fontSize: 10,
    color: palette.inkMuted,
  },

  masteryIndicator: {
    width: "100%",
    height: 4,
    backgroundColor: palette.divider,
    borderRadius: 2,
    overflow: "hidden",
  },

  masteryBar: {
    height: "100%",
    backgroundColor: palette.accentTertiary,
    borderRadius: 2,
  },

  // XP Section
  xpSection: {
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: palette.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  xpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  xpTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.ink,
  },

  xpValue: {
    fontSize: 14,
    color: palette.inkMuted,
  },

  // Next Skill Preview
  nextSkillCard: {
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: palette.accentTertiary,
    shadowColor: palette.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  nextSkillTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: palette.accentTertiary,
    marginBottom: spacing.sm,
  },

  nextSkillName: {
    fontSize: 18,
    fontWeight: "700",
    color: palette.ink,
    marginBottom: spacing.xs,
  },

  nextSkillDesc: {
    fontSize: 14,
    color: palette.inkMuted,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },

  nextSkillReq: {
    fontSize: 12,
    color: palette.accentSecondary,
    fontWeight: "600",
  },

  // Skill Tree Section
  skillTreeSection: {
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: spacing.sm,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: 20,
  },

  skillTree: {
    position: "relative",
  },

  skillWrapper: {
    position: "relative",
  },

  skillConnector: {
    position: "absolute",
    left: 18,
    top: 0,
    bottom: -spacing.xl,
    width: 2,
    backgroundColor: palette.dividerLight,
    zIndex: -1,
  },

  // Achievements Section
  achievementsSection: {
    marginBottom: spacing.xl,
  },

  achievementTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: spacing.lg,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  achievementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.md,
  },

  achievementBadge: {
    flex: 1,
    minWidth: 70,
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: "center",
    opacity: 0.5,
    shadowColor: palette.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  achievementUnlocked: {
    opacity: 1,
    borderWidth: 2,
    borderColor: palette.accentSecondary,
  },

  achievementEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },

  achievementText: {
    fontSize: 12,
    color: palette.ink,
    textAlign: "center",
    fontWeight: "600",
  },
});
