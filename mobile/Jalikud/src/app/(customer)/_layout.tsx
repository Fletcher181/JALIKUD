import { Stack } from 'expo-router';

import { RoleGuard } from '@/navigation/role-guard';

export default function CustomerLayout() {
  return (
    <RoleGuard allow="customer">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="menu/[category]" />
        <Stack.Screen name="menu/item/[id]" />
        <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
        <Stack.Screen name="checkout" options={{ presentation: 'modal' }} />
        <Stack.Screen name="my-orders/index" />
        <Stack.Screen name="my-orders/[id]" />
        <Stack.Screen name="profile/edit" />
      </Stack>
    </RoleGuard>
  );
}
