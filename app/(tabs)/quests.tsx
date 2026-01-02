import { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useQuestStore } from '../../store/questStore';
import { useStreakStore } from '../../store/streakStore';
import { generateDailyQuests } from '../../utils/questGenerator';
import { QuestCard } from '../../components/QuestCard';

export default function QuestsScreen() {
  const { quests, setQuests, completeQuest, skipQuest } = useQuestStore();
  const { increment } = useStreakStore();

  useEffect(() => {
    if (quests.length === 0) {
      setQuests(generateDailyQuests());
    }
  }, [quests.length, setQuests]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>
        Daily Quests
      </Text>

      {quests.map((q) => (
        <QuestCard
          key={q.id}
          quest={q}
          onComplete={() => {
            completeQuest(q.id);
            increment();
          }}
          onSkip={() => skipQuest(q.id)}
        />
      ))}

      {quests.length === 0 && (
        <View>
          <Text>No quests yet.</Text>
        </View>
      )}
    </ScrollView>
  );
}
