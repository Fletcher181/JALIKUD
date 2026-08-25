import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function NotFoundScreen() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <ThemedText type="subtitle">This screen does not exist.</ThemedText>
      <Link href="/login" style={styles.link}>
        <ThemedText type="link">Go back to log in</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 24,
  },
  link: {
    marginTop: 8,
  },
});
