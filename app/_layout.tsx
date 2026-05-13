import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AlertProvider } from '@/template';
import { PlatformProvider } from '@/contexts/PlatformContext';

export default function RootLayout() {
  return (
    <AlertProvider>
      <SafeAreaProvider>
        <PlatformProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="platform/[id]" />
            <Stack.Screen name="create" />
          </Stack>
        </PlatformProvider>
      </SafeAreaProvider>
    </AlertProvider>
  );
}
