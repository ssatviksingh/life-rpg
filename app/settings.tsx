import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { SettingsItem } from '../components/SettingsItem';
import { APP_NAME, APP_VERSION } from '../utils/constants';

export default function SettingsScreen() {
  const router = useRouter();

  const confirmReset = () => {
    Alert.alert(
      'Reset local data',
      'This will clear all progress stored on this device. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <SettingsItem
        title={APP_NAME}
        subtitle={`Version ${APP_VERSION}`}
      />

      <SettingsItem
        title="Safety & Disclaimer"
        subtitle="Important information about how this app works"
        onPress={() => router.push('/safety')}
      />

      <SettingsItem
        title="Reset local data"
        subtitle="Clear all progress stored on this device"
        onPress={confirmReset}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
});
