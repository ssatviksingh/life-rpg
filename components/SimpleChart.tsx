import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { palette, spacing, radius } from "../utils/ui";

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
  const chartMax = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={[styles.chartContainer, { height }]}>
        {data.map((point, index) => {
          const barHeight = (point.value / chartMax) * (height - 60); // Leave space for labels
          const color = point.color || palette.accentPrimary;

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
    color: palette.ink,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.lg,
    shadowColor: palette.shadow,
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
    color: palette.inkMuted,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  barValue: {
    fontSize: 10,
    color: palette.ink,
    fontWeight: "600",
    marginTop: 2,
  },
});
