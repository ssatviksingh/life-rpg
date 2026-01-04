import { View, Text, StyleSheet } from "react-native";
import { spacing, radius, palette as defaultPalette } from "../utils/ui";
import { useTheme } from "../contexts/ThemeContext";

// Fallback palette for when theme is not available
const FALLBACK_PALETTE = defaultPalette;
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
  const { palette } = useTheme(); // Use dynamic theme palette

  // Fallback to default palette if theme is not available
  const themePalette = palette || FALLBACK_PALETTE;
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
      <View
        style={[
          styles.connector,
          unlocked && {
            backgroundColor: themePalette.accentSecondary,
            shadowColor: themePalette.accentSecondary,
            shadowOpacity: 0.5,
            shadowRadius: 4,
          },
        ]}
      />

      <Animated.View
        style={[
          styles.node,
          {
            backgroundColor: themePalette.surfaceElevated,
            borderLeftColor: unlocked
              ? themePalette.accentSecondary
              : themePalette.divider,
            shadowColor: unlocked
              ? themePalette.accentSecondary
              : themePalette.shadow,
            borderColor: themePalette.dividerLight,
          },
          unlocked ? styles.unlocked : styles.locked,
        ]}
        entering={FadeIn.delay(unlocked ? 200 : 0)}
      >
        <View style={styles.nodeHeader}>
          <View
            style={[
              styles.skillIcon,
              {
                backgroundColor: unlocked
                  ? themePalette.accentSecondary
                  : themePalette.divider,
              },
            ]}
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
              color={
                progress > 0
                  ? themePalette.accentSecondary
                  : themePalette.divider
              }
              backgroundColor={themePalette.divider}
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
    left: 20,
    top: 0,
    bottom: 0,
    width: 2,
  },

  node: {
    marginLeft: 40,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderLeftWidth: 4,
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    borderWidth: 1,
  },

  unlocked: {
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
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
    color: themePalette.inkMuted,
    flex: 1,
  },

  titleUnlocked: {
    color: themePalette.ink,
  },

  levelBadge: {
    fontSize: 12,
    color: themePalette.divider,
    fontWeight: "600",
    backgroundColor: themePalette.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radius.sm,
  },

  levelBadgeUnlocked: {
    color: themePalette.accentSecondary,
    backgroundColor: `${themePalette.accentSecondary}15`,
  },

  desc: {
    fontSize: 14,
    color: themePalette.inkMuted,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },

  bonusContainer: {
    backgroundColor: `${themePalette.accentTertiary}15`,
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },

  bonusText: {
    fontSize: 13,
    color: themePalette.accentTertiary,
    fontWeight: "600",
    textAlign: "center",
  },

  progressContainer: {
    marginBottom: spacing.sm,
  },

  progressText: {
    fontSize: 12,
    color: themePalette.inkMuted,
    marginTop: spacing.xs,
    textAlign: "center",
    fontWeight: "500",
  },

  statusContainer: {
    alignItems: "center",
  },

  statusText: {
    fontSize: 12,
    color: themePalette.divider,
    fontWeight: "600",
  },

  statusTextUnlocked: {
    color: themePalette.accentSecondary,
  },
});
