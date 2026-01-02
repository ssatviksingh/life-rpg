import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { palette, spacing, radius } from "../utils/ui";

interface AchievementBadgeProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress: number;
    maxProgress: number;
  };
  showProgress?: boolean;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  showProgress = false,
}) => {
  const progressPercent =
    (achievement.progress / achievement.maxProgress) * 100;

  return (
    <View style={[styles.container, !achievement.unlocked && styles.locked]}>
      <View
        style={[
          styles.iconContainer,
          achievement.unlocked && styles.unlockedIcon,
        ]}
      >
        <Text style={styles.icon}>
          {achievement.unlocked ? achievement.icon : "🔒"}
        </Text>
        {!achievement.unlocked && showProgress && (
          <View style={styles.progressOverlay}>
            <Text style={styles.progressText}>
              {achievement.progress}/{achievement.maxProgress}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text
          style={[styles.title, !achievement.unlocked && styles.lockedText]}
        >
          {achievement.title}
        </Text>
        <Text
          style={[
            styles.description,
            !achievement.unlocked && styles.lockedText,
          ]}
        >
          {achievement.description}
        </Text>

        {!achievement.unlocked && showProgress && (
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progressPercent}%` }]}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: palette.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  locked: {
    opacity: 0.7,
    backgroundColor: palette.surface,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: radius.md,
    backgroundColor: palette.dividerLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
    position: "relative",
  },

  unlockedIcon: {
    backgroundColor: palette.gradientPrimary,
    shadowColor: palette.accentPrimary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  icon: {
    fontSize: 24,
  },

  progressOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  progressText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.inkStrong,
    marginBottom: 2,
  },

  description: {
    fontSize: 13,
    color: palette.inkMuted,
    lineHeight: 18,
  },

  lockedText: {
    color: palette.inkLight,
  },

  progressBar: {
    height: 4,
    backgroundColor: palette.divider,
    borderRadius: 2,
    marginTop: spacing.sm,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: palette.accentPrimary,
    borderRadius: 2,
  },
});
