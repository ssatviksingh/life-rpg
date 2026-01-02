import { View, Text, StyleSheet } from "react-native";
import { palette, spacing, radius } from "../utils/ui";
import { ProgressBar } from "./ProgressBar";
import { getXPToNextLevel, getCurrentLevelXP } from "../utils/xp";
import Animated, { FadeIn } from "react-native-reanimated";

interface SkillNodeProps {
  skill: any;
  unlocked: boolean;
  currentLevel: number;
  currentXP: number;
}

export const SkillNode = ({
  skill,
  unlocked,
  currentLevel,
  currentXP,
}: SkillNodeProps) => {
  // Calculate progress towards this skill
  let progress = 0;
  let progressText = "";

  if (unlocked) {
    progress = 1;
    progressText = "Integrated";
  } else if (currentLevel >= skill.requiredLevel) {
    progress = 1;
    progressText = "Ready to unlock";
  } else {
    // Calculate progress within current level
    const levelsNeeded = skill.requiredLevel - currentLevel;
    const currentLevelXP = getCurrentLevelXP(currentLevel, currentXP);
    const xpToNext = getXPToNextLevel(currentLevel);

    if (levelsNeeded === 1) {
      // Next level, show XP progress
      progress = currentLevelXP / xpToNext;
      progressText = `${currentLevelXP}/${xpToNext} XP to unlock`;
    } else {
      // Multiple levels away
      progress = 0;
      progressText = `${levelsNeeded} levels to unlock`;
    }
  }

  return (
    <View style={styles.wrapper}>
      <View style={[styles.connector, unlocked && styles.connectorUnlocked]} />

      <Animated.View
        style={[styles.node, unlocked ? styles.unlocked : styles.locked]}
        entering={FadeIn.delay(unlocked ? 200 : 0)}
      >
        <View style={styles.nodeHeader}>
          <View
            style={[styles.skillIcon, unlocked && styles.skillIconUnlocked]}
          >
            <Text style={styles.skillEmoji}>{unlocked ? "✨" : "🔒"}</Text>
          </View>
          <View style={styles.skillContent}>
            <Text style={[styles.title, unlocked && styles.titleUnlocked]}>
              {skill.title}
            </Text>
            <Text
              style={[styles.levelBadge, unlocked && styles.levelBadgeUnlocked]}
            >
              Lv {skill.requiredLevel}
            </Text>
          </View>
        </View>

        <Text style={styles.desc}>{skill.description}</Text>

        {unlocked && skill.passiveBonus && (
          <View style={styles.bonusContainer}>
            <Text style={styles.bonusText}>{skill.passiveBonus}</Text>
          </View>
        )}

        {!unlocked && (
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={progress}
              height={6}
              color={progress > 0 ? palette.accentSecondary : palette.divider}
              backgroundColor={palette.divider}
            />
            <Text style={styles.progressText}>{progressText}</Text>
          </View>
        )}

        <View style={styles.statusContainer}>
          <Text
            style={[styles.statusText, unlocked && styles.statusTextUnlocked]}
          >
            {unlocked ? "✓ Integrated" : "⏳ Locked"}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.xl,
    position: "relative",
  },

  connector: {
    position: "absolute",
    left: 18,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: palette.divider,
  },

  connectorUnlocked: {
    backgroundColor: palette.accentSecondary,
    shadowColor: palette.accentSecondary,
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },

  node: {
    marginLeft: 32,
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: palette.divider,
    shadowColor: palette.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  unlocked: {
    borderLeftColor: palette.accentSecondary,
    shadowColor: palette.accentSecondary,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },

  locked: {
    opacity: 0.7,
  },

  nodeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  skillIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: palette.divider,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },

  skillIconUnlocked: {
    backgroundColor: palette.accentSecondary,
  },

  skillEmoji: {
    fontSize: 16,
  },

  skillContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: palette.inkMuted,
    flex: 1,
  },

  titleUnlocked: {
    color: palette.ink,
  },

  levelBadge: {
    fontSize: 12,
    color: palette.divider,
    fontWeight: "600",
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radius.sm,
  },

  levelBadgeUnlocked: {
    color: palette.accentSecondary,
    backgroundColor: `${palette.accentSecondary}15`,
  },

  desc: {
    fontSize: 14,
    color: palette.inkMuted,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },

  bonusContainer: {
    backgroundColor: `${palette.accentTertiary}15`,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },

  bonusText: {
    fontSize: 13,
    color: palette.accentTertiary,
    fontWeight: "600",
    textAlign: "center",
  },

  progressContainer: {
    marginBottom: spacing.sm,
  },

  progressText: {
    fontSize: 12,
    color: palette.inkMuted,
    marginTop: spacing.xs,
    textAlign: "center",
    fontWeight: "500",
  },

  statusContainer: {
    alignItems: "center",
  },

  statusText: {
    fontSize: 12,
    color: palette.divider,
    fontWeight: "600",
  },

  statusTextUnlocked: {
    color: palette.accentSecondary,
  },
});
