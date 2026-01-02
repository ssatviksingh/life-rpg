import { View, Text, StyleSheet } from "react-native";
import { palette, spacing, radius } from "../utils/ui";

interface Props {
  title: string;
  body: string;
}

export const InsightCard = ({ title, body }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surfaceElevated,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: palette.ink,
    marginBottom: spacing.xs,
  },
  body: {
    fontSize: 13,
    color: palette.inkMuted,
    lineHeight: 20,
  },
});
