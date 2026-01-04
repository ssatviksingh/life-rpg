import { Text, StyleSheet, Pressable, View } from "react-native";
import { spacing, radius, palette as defaultPalette } from "../utils/ui";
import { useTheme } from "../contexts/ThemeContext";

// Fallback palette for when theme is not available
const FALLBACK_PALETTE = defaultPalette;
import { Quest } from "../types/models";

interface QuestCardProps {
  quest: Quest;
  onComplete: () => void;
  onSkip: () => void;
  onRepeat?: () => void; // Optional prop for repeating custom quests
}

export const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  onComplete,
  onSkip,
  onRepeat,
}) => {
  const { palette } = useTheme(); // Use dynamic theme palette

  // Fallback to default palette if theme is not available
  const themePalette = palette || FALLBACK_PALETTE;
  const accent = quest.isChallenge ? "#FFD700" : "#6366f1"; // Gold for challenges

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themePalette.surfaceElevated,
          shadowColor: themePalette.shadow,
        },
        quest.isChallenge && styles.challengeCard,
        quest.status === "active" && { borderLeftColor: accent },
        quest.status === "completed" && styles.completed,
        quest.status === "skipped" && styles.skipped,
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.icon, quest.isChallenge && styles.challengeIcon]}>
          {quest.icon}
        </Text>
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, quest.isChallenge && styles.challengeTitle]}
          >
            {quest.title}
          </Text>
          <Text
            style={[
              styles.category,
              quest.isChallenge && styles.challengeCategory,
            ]}
          >
            {quest.isChallenge ? "DAILY CHALLENGE" : quest.category}
          </Text>
        </View>
      </View>

      {quest.isChallenge && quest.description && (
        <Text style={[styles.description, { color: themePalette.ink }]}>
          {quest.description}
        </Text>
      )}

      <View style={[styles.metaRow, { borderTopColor: themePalette.divider }]}>
        <Text
          style={[
            styles.energyPill,
            {
              backgroundColor: themePalette.dividerLight,
              color: themePalette.inkMuted,
            },
          ]}
        >
          ⚡ {quest.energyCost} Energy
        </Text>
        <Text
          style={[
            styles.xpReward,
            {
              backgroundColor: themePalette.dividerLight,
              color: themePalette.accentSuccess,
            },
          ]}
        >
          ⭐ +{quest.xpReward} XP
        </Text>
      </View>

      {quest.status === "active" ? (
        <Pressable onPress={onComplete}>
          <Text style={[styles.action, { color: accent }]}>Execute</Text>
        </Pressable>
      ) : quest.status === "completed" ? (
        <View style={styles.completedActions}>
          <Text
            style={[styles.completedText, { color: themePalette.inkMuted }]}
          >
            ✓ Progress acknowledged.
          </Text>
          {onRepeat && (
            <Pressable onPress={onRepeat} style={styles.repeatButton}>
              <Text style={[styles.repeatButtonText, { color: accent }]}>
                🔄 Repeat Quest
              </Text>
            </Pressable>
          )}
        </View>
      ) : (
        <Text style={[styles.skippedText, { color: themePalette.inkMuted }]}>
          Skipped
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },

  icon: {
    fontSize: 20,
    marginRight: spacing.sm,
    marginTop: 2,
  },

  titleContainer: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },

  category: {
    fontSize: 11,
    textTransform: "capitalize",
    marginTop: 2,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    marginTop: spacing.sm,
  },

  action: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: spacing.md,
  },

  completed: {
    opacity: 0.6,
  },

  skipped: {
    opacity: 0.4,
  },

  completedText: {
    fontSize: 13,
    marginTop: spacing.md,
  },

  completedActions: {
    marginTop: spacing.md,
  },

  repeatButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: radius.sm,
    alignSelf: "flex-start",
  },

  repeatButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },

  skippedText: {
    fontSize: 13,
    marginTop: spacing.md,
  },

  energyPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "#E8ECFF",
    fontSize: 11,
  },

  xpReward: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "#E8F5E8",
    fontSize: 11,
    fontWeight: "600",
  },

  challengeCard: {
    backgroundColor: "#FFF9E6", // Light gold background
    borderColor: "#FFD700",
    borderWidth: 2,
    shadowColor: "#FFD700",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  challengeIcon: {
    color: "#FFD700",
  },

  challengeTitle: {
    color: "#B8860B", // Dark goldenrod
    fontWeight: "700",
  },

  challengeCategory: {
    color: "#DAA520", // Goldenrod
    fontWeight: "600",
    textTransform: "uppercase",
    fontSize: 10,
  },

  description: {
    fontSize: 14,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
});
