import { ScrollView, Text, StyleSheet } from 'react-native';
import { usePlayerStore } from '../../store/playerStore';
import { InsightCard } from '../../components/InsightCard';

export default function InsightsScreen() {
  const xp = usePlayerStore((s) => s.xp);
  const stamina = usePlayerStore((s) => s.stamina);

  const hasEnoughData = xp > 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Insights</Text>
      <Text style={styles.subtle}>
        Light reflections — nothing you need to act on.
      </Text>

      {hasEnoughData ? (
        <>
          <InsightCard
            title="Weekly Progress"
            body="You’ve been making steady progress this week. Small steps count."
          />

          <InsightCard
            title="Energy Trend"
            body={
              stamina >= 60
                ? 'Your energy has been fairly stable.'
                : 'Your body may be asking for a gentler pace.'
            }
          />
        </>
      ) : (
        <Text style={styles.subtle}>
          Insights will appear once there’s enough activity to reflect on.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  subtle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
});
