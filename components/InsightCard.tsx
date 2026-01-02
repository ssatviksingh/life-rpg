import { View, Text, StyleSheet } from 'react-native';

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
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  body: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },
});
