import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { spacing, radius, palette as defaultPalette } from "../utils/ui";
import { useTheme } from "../contexts/ThemeContext";

// Fallback palette for when theme is not available
const FALLBACK_PALETTE = defaultPalette;

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
  const { palette } = useTheme(); // Use dynamic theme palette

  // Fallback to default palette if theme is not available
  const themePalette = palette || FALLBACK_PALETTE;
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
    backgroundColor: themePalette.surfaceElevated,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    shadowColor: themePalette.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    borderWidth: 1,
    borderColor: themePalette.dividerLight,
  },

  locked: {
    opacity: 0.7,
    backgroundColor: themePalette.surface,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: radius.md,
    backgroundColor: themePalette.dividerLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
    position: "relative",
  },

  unlockedIcon: {
    backgroundColor: themePalette.gradientPrimary,
    shadowColor: themePalette.accentPrimary,
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
    color: themePalette.inkStrong,
    marginBottom: 2,
  },

  description: {
    fontSize: 13,
    color: themePalette.inkMuted,
    lineHeight: 18,
  },

  lockedText: {
    color: themePalette.inkLight,
  },

  progressBar: {
    height: 4,
    backgroundColor: themePalette.divider,
    borderRadius: 2,
    marginTop: spacing.sm,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: themePalette.accentPrimary,
    borderRadius: 2,
  },
});
