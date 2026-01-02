import { View, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string;
}

export const StatCard = ({ label, value }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#F2F5F7',
    padding: 16,
    borderRadius: 12,
    margin: 4,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 4,
  },
});
