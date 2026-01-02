import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { palette, spacing } from "../utils/ui";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "large";
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  size = "large",
  color = palette.accentPrimary,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  message: {
    marginTop: spacing.md,
    fontSize: 16,
    color: palette.ink,
    textAlign: "center",
  },
});
