import { View, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

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
  const finalColor = color || palette.accentPrimary;
  const finalBackgroundColor = backgroundColor || palette.divider;
  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor: finalBackgroundColor },
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
    borderRadius: 6,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
