import { View, Text, StyleSheet } from "react-native";
import { spacing, radius, palette as defaultPalette } from "../utils/ui";
import { useTheme } from "../contexts/ThemeContext";

// Fallback palette for when theme is not available
const FALLBACK_PALETTE = defaultPalette;

interface Props {
  title: string;
  body: string;
}

export const InsightCard = ({ title, body }: Props) => {
  const { palette } = useTheme(); // Use dynamic theme palette

  // Fallback to default palette if theme is not available
  const themePalette = palette || FALLBACK_PALETTE;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themePalette.surfaceElevated,
          shadowColor: themePalette.shadow,
        },
      ]}
    >
      <Text style={[styles.title, { color: themePalette.ink }]}>{title}</Text>
      <Text style={[styles.body, { color: themePalette.inkMuted }]}>
        {body}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    shadowOpacity: 1,
    shadowRadius: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  body: {
    fontSize: 13,
    lineHeight: 20,
  },
});
