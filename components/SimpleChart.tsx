import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { spacing, radius, palette as defaultPalette } from "../utils/ui";
import { useTheme } from "../contexts/ThemeContext";

// Fallback palette for when theme is not available
const FALLBACK_PALETTE = defaultPalette;

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface SimpleChartProps {
  data: DataPoint[];
  title?: string;
  maxValue?: number;
  height?: number;
}

export const SimpleChart: React.FC<SimpleChartProps> = ({
  data,
  title,
  maxValue,
  height = 200,
}) => {
  const { palette } = useTheme(); // Use dynamic theme palette

  // Fallback to default palette if theme is not available
  const themePalette = palette || FALLBACK_PALETTE;
  const chartMax = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={[styles.chartContainer, { height }]}>
        {data.map((point, index) => {
          const barHeight = (point.value / chartMax) * (height - 60); // Leave space for labels
          const color = point.color || themePalette.accentPrimary;

          return (
            <View key={index} style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  {
                    height: barHeight,
                    backgroundColor: color,
                  },
                ]}
              />
              <Text style={styles.barLabel}>{point.label}</Text>
              <Text style={styles.barValue}>{point.value}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: themePalette.ink,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: themePalette.surfaceElevated,
    borderRadius: radius.lg,
    shadowColor: themePalette.shadow,
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  barContainer: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 2,
  },
  bar: {
    width: 30,
    borderRadius: radius.sm,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 12,
    color: themePalette.inkMuted,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  barValue: {
    fontSize: 10,
    color: themePalette.ink,
    fontWeight: "600",
    marginTop: 2,
  },
});
