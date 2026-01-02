import { Pressable, Text, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../utils/ui";

export const Button = ({
  label,
  onPress,
  variant = "primary",
  disabled,
}: any) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === "primary" ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[styles.label, variant === "secondary" && styles.secondaryLabel]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#6B7CFF",
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: "transparent",
  },
  disabled: {
    backgroundColor: "#E5E7EB",
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryLabel: {
    color: colors.textSecondary,
  },
});
