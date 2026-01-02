import { ScrollView, Text, StyleSheet } from 'react-native';

export default function SafetyScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Safety & Disclaimer</Text>

      <Text style={styles.body}>
        This app is a self-reflection and habit support tool.
      </Text>

      <Text style={styles.body}>
        It is not therapy. It does not provide medical advice. It does not diagnose
        conditions or replace professional care.
      </Text>

      <Text style={styles.body}>
        Everyone’s needs are different. If you ever feel overwhelmed, reaching out
        to trusted people in your life or a qualified professional can help.
      </Text>

      <Text style={styles.body}>
        Progress here is meant to feel supportive, not demanding. Rest is part of
        growth.
      </Text>
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
    marginBottom: 16,
  },
  body: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },
});
