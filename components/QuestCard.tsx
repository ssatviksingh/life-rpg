import { Text, StyleSheet, Pressable, View } from "react-native";
import { palette, spacing, radius } from "../utils/ui";
import { Quest } from "../types/models";

interface QuestCardProps {
  quest: Quest;
  onComplete: () => void;
  onSkip: () => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({
  quest,
  onComplete,
  onSkip,
}) => {
  const accent = quest.isChallenge ? "#FFD700" : "#6366f1"; // Gold for challenges

  return (
    <View
      style={[
        styles.card,
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
        <Text style={styles.description}>{quest.description}</Text>
      )}

      <View style={styles.metaRow}>
        <Text style={styles.energyPill}>⚡ {quest.energyCost} Energy</Text>
        <Text style={styles.xpReward}>⭐ +{quest.xpReward} XP</Text>
      </View>

      {quest.status === "active" ? (
        <Pressable onPress={onComplete}>
          <Text style={[styles.action, { color: accent }]}>Execute</Text>
        </Pressable>
      ) : quest.status === "completed" ? (
        <Text style={styles.completedText}>✓ Progress acknowledged.</Text>
      ) : (
        <Text style={styles.skippedText}>Skipped</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
    shadowColor: palette.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
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
    color: palette.ink,
    lineHeight: 20,
  },

  category: {
    fontSize: 11,
    color: palette.inkMuted,
    textTransform: "capitalize",
    marginTop: 2,
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: palette.divider,
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
    color: palette.inkMuted,
    marginTop: spacing.md,
  },

  skippedText: {
    fontSize: 13,
    color: palette.inkMuted,
    marginTop: spacing.md,
  },

  energyPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "#E8ECFF",
    fontSize: 11,
    color: palette.inkMuted,
  },

  xpReward: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "#E8F5E8",
    fontSize: 11,
    color: palette.accentSecondary,
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
    color: palette.inkMuted,
    marginTop: spacing.sm,
    lineHeight: 20,
  },
});
