import { View, Text, StyleSheet, Pressable } from "react-native";
import { palette, radius, spacing } from "../utils/ui";
import { useCompanionStore } from "../store/companionStore";
import * as Haptics from "expo-haptics";

interface Props {
  level: number;
}

export const CompanionOrb = ({ level }: Props) => {
  const { affection, mood, petCompanion, getCurrentMood } = useCompanionStore();
  const currentMood = getCurrentMood();

  const handlePress = () => {
    petCompanion();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const getMoodEmoji = () => {
    switch (currentMood) {
      case "happy":
        return "😊";
      case "sad":
        return "😢";
      default:
        return "😐";
    }
  };

  const getMoodColor = () => {
    switch (currentMood) {
      case "happy":
        return "#10B981"; // green
      case "sad":
        return "#EF4444"; // red
      default:
        return "#6B7280"; // gray
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.orbContainer}>
        <View
          style={[
            styles.orb,
            {
              opacity: Math.min(0.4 + level * 0.05, 1),
              borderColor: getMoodColor(),
              shadowColor: getMoodColor(),
            },
          ]}
        >
          <Text style={styles.moodEmoji}>{getMoodEmoji()}</Text>
        </View>
      </View>
      <Text style={styles.label}>Companion</Text>
      <Text style={styles.affection}>Affection: {affection}/100</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  orbContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  orb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.accentTertiary,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    borderWidth: 3,
    borderColor: palette.accentPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  moodEmoji: {
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
  },
  label: {
    fontSize: 12,
    color: palette.inkMuted,
    marginTop: spacing.xs,
  },
  affection: {
    fontSize: 10,
    color: palette.inkMuted,
    marginTop: spacing.xs / 2,
  },
});
