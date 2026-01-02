import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const SettingsItem = ({ title, subtitle, onPress }: Props) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
});
