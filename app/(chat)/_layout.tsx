import { useColor } from 'amogamobileds-v1';
import { Stack } from 'expo-router';

export default function ChatLayout() {
  const background = useColor('background');

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: background },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
