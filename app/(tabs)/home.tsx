import { View, Text, StyleSheet } from 'react-native';
import { usePlayerStore } from '../../store/playerStore';
import { useQuestStore } from '../../store/questStore';
import { StatCard } from '../../components/StatCard';
import { ProgressBar } from '../../components/ProgressBar';
import { getXPToNextLevel } from '../../utils/xp';

export default function HomeScreen() {
  const { level, xp, stamina, restDay } = usePlayerStore();
  const { quests } = useQuestStore();

  const completed = quests.filter((q) => q.status === 'completed').length;
  const remaining = quests.filter((q) => q.status === 'active').length;

  const xpToNext = getXPToNextLevel(level);
  const xpProgress = xp / xpToNext;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today</Text>

      {restDay ? (
        <View style={styles.restCard}>
          <Text style={styles.restText}>
            Today is for rest and recovery. Progress continues tomorrow.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.row}>
            <StatCard label="Level" value={level.toString()} />
            <StatCard label="Stamina" value={`${stamina}%`} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Progress</Text>
            <ProgressBar progress={xpProgress} />
            <Text style={styles.subtle}>
              Steady progress adds up.
            </Text>
          </View>
        </>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Quests</Text>
        <Text style={styles.subtle}>
          {completed} completed · {remaining} remaining
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  section: {
    marginTop: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#374151',
  },
  subtle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 6,
  },
  restCard: {
    backgroundColor: '#EEF2FF',
    padding: 20,
    borderRadius: 14,
    marginTop: 12,
  },
  restText: {
    fontSize: 15,
    color: '#3730A3',
    lineHeight: 22,
  },
});
