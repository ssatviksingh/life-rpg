import React, { Component, ErrorInfo, ReactNode } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { palette, spacing, radius } from "../utils/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            The app encountered an unexpected error. Please try restarting the
            app.
          </Text>

          <Pressable
            style={styles.button}
            onPress={() => this.setState({ hasError: false, error: undefined })}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </Pressable>

          {__DEV__ && this.state.error && (
            <Text style={styles.errorDetails}>{this.state.error.message}</Text>
          )}
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
    backgroundColor: palette.appBg,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: palette.inkStrong,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: palette.ink,
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  button: {
    backgroundColor: palette.accentPrimary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
  },
  buttonText: {
    color: palette.surfaceElevated,
    fontSize: 16,
    fontWeight: "600",
  },
  errorDetails: {
    fontSize: 12,
    color: palette.inkMuted,
    marginTop: spacing.lg,
    textAlign: "center",
  },
});
