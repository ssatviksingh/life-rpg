import { View, StyleSheet } from 'react-native';

interface Props {
  progress: number; // 0–1
}

export const ProgressBar = ({ progress }: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: `${Math.min(progress * 100, 100)}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#60A5FA',
  },
});
