import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { spacing, radius } from "../../utils/ui";
import { useTheme } from "../../contexts/ThemeContext";
import { useQuestStore } from "../../store/questStore";
import { useStreakStore } from "../../store/streakStore";
import { useCustomQuestStore } from "../../store/customQuestStore";
import { usePlayerStore } from "../../store/playerStore";
import { generateDailyQuests } from "../../utils/questGenerator";
import { QuestCard } from "../../components/QuestCard";
import { CustomQuestCreator } from "../../components/CustomQuestCreator";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export default function QuestsScreen() {
  const { quests, completeQuest, skipQuest, regenerateDailyQuests } =
    useQuestStore();
  const { registerCompletion } = useStreakStore();
  const {
    customQuests,
    completeCustomQuest,
    repeatCustomQuest,
    removeCustomQuest,
  } = useCustomQuestStore();
  const { palette } = useTheme(); // Use dynamic theme palette
  const { addXP, adjustStamina } = usePlayerStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showCustomQuestCreator, setShowCustomQuestCreator] = useState(false);

  useEffect(() => {
    // Regenerate quests daily if needed
    const loadQuests = async () => {
      try {
        setIsLoading(true);
        await regenerateDailyQuests();
      } catch (error) {
        console.error("Failed to load quests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuests();
  }, [regenerateDailyQuests]);

  const handleCompleteCustomQuest = (questId: string, quest: any) => {
    const currentPlayer = usePlayerStore.getState();

    if (currentPlayer.restDay) return;

    completeCustomQuest(questId);
    addXP(quest.xpReward);
    adjustStamina(-quest.energyCost);
    registerCompletion();

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleRemoveCustomQuest = (questId: string) => {
    // Optional: Add confirmation dialog
    removeCustomQuest(questId);
  };

  const handleRepeatCustomQuest = (questId: string) => {
    repeatCustomQuest(questId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.backgroundGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <LoadingSpinner message="Loading your daily quests..." />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.backgroundGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={styles.content} entering={FadeInUp.delay(200)}>
            <Text style={styles.title}>Daily Quests</Text>
            <Text style={styles.subtitle}>
              Complete these tasks to gain experience and maintain your energy.
            </Text>

            {quests.map((q, index) => (
              <Animated.View
                key={q.id}
                entering={FadeInUp.delay(400 + index * 100)}
              >
                <QuestCard
                  quest={q}
                  onComplete={() => {
                    completeQuest(q.id);
                    registerCompletion();
                    Haptics.notificationAsync(
                      Haptics.NotificationFeedbackType.Success
                    );
                  }}
                  onSkip={() => skipQuest(q.id)}
                />
              </Animated.View>
            ))}

            {quests.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No quests available.</Text>
                <Text style={styles.emptySubtext}>
                  Check back tomorrow for new challenges.
                </Text>
              </View>
            )}

            {/* Custom Quests Section */}
            {(customQuests.length > 0 || true) && (
              <Animated.View
                style={styles.section}
                entering={FadeInUp.delay(600)}
              >
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>🎯 Custom Quests</Text>
                  <Pressable
                    style={styles.addButton}
                    onPress={() => setShowCustomQuestCreator(true)}
                  >
                    <Text style={styles.addButtonText}>+ Add</Text>
                  </Pressable>
                </View>

                {customQuests.length === 0 ? (
                  <View style={styles.customEmptyState}>
                    <Text style={styles.customEmptyText}>
                      No custom quests yet
                    </Text>
                    <Text style={styles.customEmptySubtext}>
                      Create your own personalized quests to track what matters
                      most to you.
                    </Text>
                  </View>
                ) : (
                  customQuests.map((quest, index) => (
                    <Animated.View
                      key={quest.id}
                      entering={FadeInUp.delay(700 + index * 100)}
                    >
                      <QuestCard
                        quest={quest}
                        onComplete={() =>
                          handleCompleteCustomQuest(quest.id, quest)
                        }
                        onSkip={() => handleRemoveCustomQuest(quest.id)}
                        onRepeat={() => handleRepeatCustomQuest(quest.id)}
                      />
                    </Animated.View>
                  ))
                )}
              </Animated.View>
            )}
          </Animated.View>

          {/* Custom Quest Creator Modal */}
          <Modal
            visible={showCustomQuestCreator}
            animationType="slide"
            presentationStyle="pageSheet"
          >
            <View style={styles.modalContainer}>
              <LinearGradient
                colors={["#667eea", "#764ba2"]}
                style={styles.modalBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <CustomQuestCreator
                onClose={() => setShowCustomQuestCreator(false)}
              />
            </View>
          </Modal>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
  },

  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: spacing.sm,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  emptyText: {
    fontSize: 16,
    color: palette.ink,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    fontSize: 14,
    color: palette.inkMuted,
  },

  section: {
    marginTop: spacing.xl,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  addButton: {
    backgroundColor: palette.accentPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },

  addButtonText: {
    color: palette.inkStrong,
    fontSize: 14,
    fontWeight: "600",
  },

  customEmptyState: {
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: "center",
  },

  customEmptyText: {
    fontSize: 16,
    color: palette.ink,
    fontWeight: "600",
    marginBottom: spacing.sm,
  },

  customEmptySubtext: {
    fontSize: 14,
    color: palette.inkMuted,
    textAlign: "center",
    lineHeight: 20,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: palette.appBg,
  },

  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
