import { View, StyleSheet } from "react-native";
import { palette } from "../utils/ui";

interface Props {
  progress: number; // 0–1
  height?: number;
  color?: string;
  backgroundColor?: string;
}

export const ProgressBar = ({
  progress,
  height = 10,
  color = palette.accentPrimary,
  backgroundColor = palette.divider,
}: Props) => {
  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${Math.min(progress * 100, 100)}%`,
            backgroundColor: color,
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
