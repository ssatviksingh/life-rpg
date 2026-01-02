import { Audio } from 'expo-av';

class SoundManager {
  private sounds: Map<string, Audio.Sound> = new Map();
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      this.isInitialized = true;
    } catch (error) {
      console.warn('Failed to initialize audio:', error);
    }
  }

  // Simple beep sounds using Audio context (since we don't have actual sound files)
  async playSound(type: 'success' | 'error' | 'notification' | 'achievement' | 'level_up') {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // Create a simple beep sound using Web Audio API through expo-av
      const sound = new Audio.Sound();

      // For now, we'll use vibration as a fallback since actual sound files would need to be added
      // In a real app, you'd load actual sound files here
      switch (type) {
        case 'success':
          // Short success vibration
          await this.playVibration([0, 50]);
          break;
        case 'error':
          // Double vibration for error
          await this.playVibration([0, 100, 50, 100]);
          break;
        case 'notification':
          // Gentle notification
          await this.playVibration([0, 30]);
          break;
        case 'achievement':
          // Triumphant achievement sound
          await this.playVibration([0, 150, 50, 150, 50, 150]);
          break;
        case 'level_up':
          // Celebratory level up
          await this.playVibration([0, 200, 100, 200, 100, 200]);
          break;
      }

      // Cleanup
      await sound.unloadAsync();
    } catch (error) {
      console.warn('Failed to play sound:', error);
    }
  }

  private async playVibration(pattern: number[]) {
    // Import Haptics here to avoid circular dependencies
    const { ImpactFeedbackStyle, NotificationFeedbackType } = await import('expo-haptics');

    // Use haptics as a fallback for sounds
    if (pattern.length === 2) {
      // Simple tap
      await import('expo-haptics').then(Haptics =>
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      );
    } else if (pattern.length === 4) {
      // Error pattern
      await import('expo-haptics').then(Haptics =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      );
    } else {
      // Success pattern
      await import('expo-haptics').then(Haptics =>
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      );
    }
  }

  async cleanup() {
    for (const sound of this.sounds.values()) {
      try {
        await sound.unloadAsync();
      } catch (error) {
        console.warn('Failed to unload sound:', error);
      }
    }
    this.sounds.clear();
  }
}

export const soundManager = new SoundManager();
