import { Stack } from 'expo-router';

import { RoleGuard } from '@/navigation/role-guard';

export default function StaffLayout() {
  return (
    <RoleGuard allow="staff">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="incoming-orders/[id]" />
        <Stack.Screen name="sold-out/report" />
      </Stack>
    </RoleGuard>
  );
}
