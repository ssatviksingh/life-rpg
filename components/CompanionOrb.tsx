import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withRepeat,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { radius, spacing, palette as defaultPalette } from "../utils/ui";
import { useCompanionStore } from "../store/companionStore";
import { useTheme } from "../contexts/ThemeContext";

// Fallback palette for when theme is not available
const FALLBACK_PALETTE = defaultPalette;
import * as Haptics from "expo-haptics";

interface Props {
  level: number;
}

export const CompanionOrb = ({ level }: Props) => {
  const { palette } = useTheme(); // Use dynamic theme palette

  // Fallback to default palette if theme is not available
  const themePalette = palette || FALLBACK_PALETTE;

  const { affection, mood, petCompanion, getCurrentMood } = useCompanionStore();
  const currentMood = getCurrentMood();

  // Animation values
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const glowOpacity = useSharedValue(0.3);

  // Continuous subtle glow animation
  React.useEffect(() => {
    glowOpacity.value = withRepeat(
      withTiming(0.6, { duration: 2000 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handlePress = () => {
    // Enhanced haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Sophisticated animation sequence
    scale.value = withSpring(1.2, { damping: 8, stiffness: 200 });
    rotation.value = withTiming(360, {
      duration: 600,
      easing: Easing.out(Easing.exp),
    });

    setTimeout(() => {
      scale.value = withSpring(1, { damping: 10, stiffness: 150 });
      rotation.value = withTiming(0, { duration: 400 });
    }, 200);

    // Pet companion after animation starts
    runOnJS(petCompanion)();
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
        {/* Glow effect */}
        <Animated.View
          style={[
            styles.orbGlow,
            {
              backgroundColor: getMoodColor(),
              shadowColor: getMoodColor(),
            },
            glowStyle,
          ]}
        />

        {/* Main orb */}
        <Animated.View
          style={[
            styles.orb,
            {
              opacity: Math.min(0.4 + level * 0.05, 1),
              borderColor: getMoodColor(),
              shadowColor: getMoodColor(),
              backgroundColor: themePalette.accentTertiary,
              borderColor: themePalette.accentPrimary,
            },
            animatedStyle,
          ]}
        >
          <Text style={styles.moodEmoji}>{getMoodEmoji()}</Text>
        </Animated.View>
      </View>
      <Text style={[styles.label, { color: themePalette.inkMuted }]}>
        Companion
      </Text>
      <Text style={[styles.affection, { color: themePalette.inkMuted }]}>
        Affection: {affection}/100
      </Text>
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
  orbGlow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    shadowOpacity: 0.3,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
  },
  orb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  moodEmoji: {
    fontSize: 28,
    textAlign: "center",
    textAlignVertical: "center",
  },
  label: {
    fontSize: 12,
    marginTop: spacing.xs,
  },
  affection: {
    fontSize: 10,
    marginTop: spacing.xs / 2,
  },
});
