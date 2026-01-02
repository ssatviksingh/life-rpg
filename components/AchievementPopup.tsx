import React, { useEffect } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, ZoomIn, SlideInUp } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { palette, spacing, radius } from "../utils/ui";

interface AchievementPopupProps {
  achievement: {
    title: string;
    description: string;
    icon: string;
  } | null;
  onClose: () => void;
  visible: boolean;
}

export const AchievementPopup: React.FC<AchievementPopupProps> = ({
  achievement,
  onClose,
  visible,
}) => {
  useEffect(() => {
    if (visible && achievement) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [visible, achievement]);

  if (!achievement || !visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.overlay} onPress={onClose}>
          <Animated.View
            style={styles.container}
            entering={ZoomIn.springify().damping(15)}
          >
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Animated.View entering={FadeIn.delay(300)}>
                <Text style={styles.icon}>{achievement.icon}</Text>
              </Animated.View>

              <Animated.View entering={SlideInUp.delay(500)}>
                <Text style={styles.title}>Achievement Unlocked!</Text>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.description}>
                  {achievement.description}
                </Text>
              </Animated.View>

              <Animated.View entering={FadeIn.delay(800)}>
                <Pressable style={styles.button} onPress={onClose}>
                  <Text style={styles.buttonText}>Awesome!</Text>
                </Pressable>
              </Animated.View>
            </LinearGradient>
          </Animated.View>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    maxWidth: 320,
    borderRadius: radius.xxl,
    overflow: "hidden",
    shadowColor: palette.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  gradient: {
    padding: spacing.xxl,
    alignItems: "center",
  },
  icon: {
    fontSize: 60,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: spacing.sm,
    opacity: 0.9,
  },
  achievementTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    lineHeight: 22,
    opacity: 0.9,
    marginBottom: spacing.xl,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
