import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { palette, spacing } from "../utils/ui";

interface AppLoadingScreenProps {
  message?: string;
}

export const AppLoadingScreen: React.FC<AppLoadingScreenProps> = ({
  message = "Loading your adventure...",
}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={styles.content} entering={FadeIn.duration(800)}>
          <Animated.View entering={ZoomIn.delay(300).springify()}>
            <Text style={styles.logo}>🎮</Text>
          </Animated.View>

          <Animated.View entering={FadeIn.delay(600)}>
            <Text style={styles.title}>Life RPG</Text>
            <Text style={styles.subtitle}>
              Transform your daily habits into an epic adventure
            </Text>
          </Animated.View>

          <Animated.View
            style={styles.loadingContainer}
            entering={FadeIn.delay(900)}
          >
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.loadingText}>{message}</Text>
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  logo: {
    fontSize: 80,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: spacing.sm,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: spacing.xxl,
    lineHeight: 24,
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    color: "white",
    fontSize: 16,
    marginTop: spacing.md,
    opacity: 0.8,
  },
});
