import { View, StyleSheet } from "react-native";
import { palette as defaultPalette } from "../utils/ui";
import { useTheme } from "../contexts/ThemeContext";

// Fallback palette for when theme is not available
const FALLBACK_PALETTE = defaultPalette;

interface Props {
  progress: number; // 0–1
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export const ProgressBar = ({
  progress,
  height = 10,
  color,
  backgroundColor,
}: Props) => {
  const { palette } = useTheme(); // Use dynamic theme palette

  // Fallback to default palette if theme is not available
  const themePalette = palette || FALLBACK_PALETTE;
  const finalColor = color || themePalette.accentPrimary;
  const finalBackgroundColor = backgroundColor || themePalette.divider;
  return (
    <View
      style={[
        styles.container,
        {
          height,
          backgroundColor: finalBackgroundColor,
          shadowColor: themePalette.shadow,
        },
      ]}
    >
      <View
        style={[
          styles.fill,
          {
            width: `${Math.min(
              Math.max(progress * 100, progress > 0 ? 2 : 0),
              100
            )}%`,
            backgroundColor: finalColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  fill: {
    height: "100%",
    borderRadius: 8,
  },
});
