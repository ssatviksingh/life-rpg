import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
} from "react-native";
import { palette, spacing, radius } from "../utils/ui";
import { useOnboardingStore, onboardingSteps } from "../store/onboardingStore";

const { width, height } = Dimensions.get("window");

export const OnboardingModal = () => {
  const {
    hasCompletedOnboarding,
    currentStep,
    nextStep,
    previousStep,
    completeOnboarding,
  } = useOnboardingStore();

  if (hasCompletedOnboarding) return null;

  const step = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <Modal
      visible={!hasCompletedOnboarding}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            {onboardingSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index <= currentStep && styles.progressDotActive,
                ]}
              />
            ))}
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.icon}>{step.icon}</Text>
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.description}>{step.description}</Text>
          </View>

          {/* Navigation */}
          <View style={styles.buttonContainer}>
            {currentStep > 0 && (
              <Pressable
                style={[styles.button, styles.secondaryButton]}
                onPress={previousStep}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  Back
                </Text>
              </Pressable>
            )}

            <Pressable
              style={[styles.button, styles.primaryButton]}
              onPress={isLastStep ? completeOnboarding : nextStep}
            >
              <Text style={[styles.buttonText, styles.primaryButtonText]}>
                {isLastStep ? "Get Started" : "Next"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: palette.surfaceElevated,
    borderRadius: radius.xl,
    padding: spacing.xl,
    margin: spacing.lg,
    maxWidth: 400,
    width: width * 0.9,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.divider,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: palette.accentPrimary,
  },
  content: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.inkStrong,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    color: palette.ink,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    alignItems: "center",
    marginHorizontal: spacing.xs,
  },
  primaryButton: {
    backgroundColor: palette.accentPrimary,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: palette.divider,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButtonText: {
    color: palette.surfaceElevated,
  },
  secondaryButtonText: {
    color: palette.ink,
  },
});
