import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { palette, spacing, radius } from "../utils/ui";
import { useCustomQuestStore } from "../store/customQuestStore";
import { QuestCategory } from "../types/models";

interface CustomQuestCreatorProps {
  onClose: () => void;
}

const CATEGORIES: { value: QuestCategory; label: string; icon: string }[] = [
  { value: "health", label: "Health", icon: "💚" },
  { value: "mindfulness", label: "Mindfulness", icon: "🧘" },
  { value: "productivity", label: "Productivity", icon: "⚡" },
  { value: "social", label: "Social", icon: "👥" },
  { value: "creativity", label: "Creativity", icon: "🎨" },
  { value: "learning", label: "Learning", icon: "📚" },
];

export const CustomQuestCreator: React.FC<CustomQuestCreatorProps> = ({
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<QuestCategory>("health");
  const [difficulty, setDifficulty] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [energyCost, setEnergyCost] = useState(5);
  const [xpReward, setXpReward] = useState(25);

  const addCustomQuest = useCustomQuestStore((state) => state.addCustomQuest);

  const handleCreateQuest = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a quest title");
      return;
    }

    if (xpReward <= 0) {
      Alert.alert("Error", "XP reward must be greater than 0");
      return;
    }

    if (energyCost < 0) {
      Alert.alert("Error", "Energy cost cannot be negative");
      return;
    }

    addCustomQuest({
      title: title.trim(),
      description: description.trim() || undefined,
      category,
      difficulty,
      energyCost,
      xpReward,
      icon: getCategoryIcon(category),
    });

    Alert.alert("Success", "Custom quest created!", [
      { text: "OK", onPress: onClose },
    ]);
  };

  const getCategoryIcon = (cat: QuestCategory): string => {
    const categoryData = CATEGORIES.find((c) => c.value === cat);
    return categoryData?.icon || "🎯";
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create Custom Quest</Text>

        {/* Title Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Quest Title *</Text>
          <TextInput
            style={styles.textInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter quest title..."
            placeholderTextColor={palette.inkMuted}
            maxLength={50}
          />
        </View>

        {/* Description Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe what needs to be done..."
            placeholderTextColor={palette.inkMuted}
            multiline
            numberOfLines={3}
            maxLength={200}
          />
        </View>

        {/* Category Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.value}
                style={[
                  styles.categoryButton,
                  category === cat.value && styles.categoryButtonSelected,
                ]}
                onPress={() => setCategory(cat.value)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.categoryLabel,
                    category === cat.value && styles.categoryLabelSelected,
                  ]}
                >
                  {cat.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Difficulty Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Difficulty Level</Text>
          <View style={styles.difficultyContainer}>
            {[1, 2, 3, 4, 5].map((level) => (
              <Pressable
                key={level}
                style={[
                  styles.difficultyButton,
                  difficulty === level && styles.difficultyButtonSelected,
                ]}
                onPress={() => setDifficulty(level as 1 | 2 | 3 | 4 | 5)}
              >
                <Text
                  style={[
                    styles.difficultyText,
                    difficulty === level && styles.difficultyTextSelected,
                  ]}
                >
                  {level}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* XP Reward */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>XP Reward</Text>
          <TextInput
            style={styles.numberInput}
            value={xpReward.toString()}
            onChangeText={(text) => {
              const num = parseInt(text) || 0;
              setXpReward(Math.max(1, Math.min(200, num)));
            }}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>

        {/* Energy Cost */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Energy Cost</Text>
          <TextInput
            style={styles.numberInput}
            value={energyCost.toString()}
            onChangeText={(text) => {
              const num = parseInt(text) || 0;
              setEnergyCost(Math.max(0, Math.min(50, num)));
            }}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
      </ScrollView>

      {/* Action Buttons - Outside ScrollView */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.createButton} onPress={handleCreateQuest}>
          <Text style={styles.createButtonText}>Create Quest</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl, // Extra padding for buttons
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.ink,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.ink,
    marginBottom: spacing.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: palette.divider,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 16,
    color: palette.ink,
    backgroundColor: palette.surface,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
  },
  numberInput: {
    borderWidth: 1,
    borderColor: palette.divider,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 16,
    color: palette.ink,
    backgroundColor: palette.surface,
    width: 100,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  categoryButton: {
    flex: 1,
    minWidth: 80,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.surface,
    alignItems: "center",
    gap: spacing.xs,
  },
  categoryButtonSelected: {
    borderColor: palette.accentSecondary,
    backgroundColor: `${palette.accentSecondary}20`,
    shadowColor: palette.accentSecondary,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryLabel: {
    fontSize: 12,
    color: palette.inkMuted,
    textAlign: "center",
  },
  categoryLabelSelected: {
    color: palette.accentSecondary,
    fontWeight: "600",
  },
  difficultyContainer: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  difficultyButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.surface,
    alignItems: "center",
  },
  difficultyButtonSelected: {
    borderColor: palette.accentSecondary,
    backgroundColor: `${palette.accentSecondary}20`,
    shadowColor: palette.accentSecondary,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  difficultyText: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.inkMuted,
  },
  difficultyTextSelected: {
    color: palette.accentSecondary,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
    paddingBottom: Platform.OS === "ios" ? spacing.xl : spacing.lg,
    backgroundColor: palette.surface,
    borderTopWidth: 1,
    borderTopColor: palette.dividerLight,
  },
  cancelButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.surface,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.inkMuted,
  },
  createButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: palette.accentPrimary,
    alignItems: "center",
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.inkStrong,
  },
});
