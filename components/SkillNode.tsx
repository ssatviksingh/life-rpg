import { View, Text, StyleSheet } from 'react-native';
import { SkillNodeData } from '../data/skillTree';

interface Props {
  skill: SkillNodeData;
  unlocked: boolean;
}

export const SkillNode = ({ skill, unlocked }: Props) => {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: unlocked ? '#ECFDF5' : '#F3F4F6' },
      ]}
    >
      <Text style={[styles.title, !unlocked && styles.locked]}>
        {skill.title}
      </Text>

      <Text style={styles.desc}>{skill.description}</Text>

      <Text style={styles.meta}>
        {unlocked
          ? `Unlocked · ${skill.passiveBonus}`
          : `Unlocks at level ${skill.requiredLevel}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065F46',
  },
  locked: {
    color: '#6B7280',
  },
  desc: {
    fontSize: 13,
    color: '#374151',
    marginTop: 6,
  },
  meta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
});
