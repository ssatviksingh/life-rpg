import { ScrollView, Text, StyleSheet } from 'react-native';
import { usePlayerStore } from '../../store/playerStore';
import { SKILL_TREE } from '../../data/skillTree';
import { SkillNode } from '../../components/SkillNode';

export default function CharacterScreen() {
  const level = usePlayerStore((s) => s.level);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Character Growth</Text>
      <Text style={styles.subtle}>
        These skills reflect long-term progress. Nothing to rush.
      </Text>

      {SKILL_TREE.map((skill) => (
        <SkillNode
          key={skill.id}
          skill={skill}
          unlocked={level >= skill.requiredLevel}
        />
      ))}
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
