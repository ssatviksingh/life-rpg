import { View, Text, Button, StyleSheet } from 'react-native';
import { Quest } from '../types/models';

interface Props {
  quest: Quest;
  onComplete: () => void;
  onSkip: () => void;
}

export const QuestCard = ({ quest, onComplete, onSkip }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{quest.title}</Text>
      <Text>Difficulty: {quest.difficulty}</Text>
      <Text>Status: {quest.status}</Text>

      {quest.status === 'active' && (
        <View style={styles.actions}>
          <Button title="Complete" onPress={onComplete} />
          <Button title="Skip" onPress={onSkip} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actions: {
    marginTop: 8,
    gap: 8,
  },
});
