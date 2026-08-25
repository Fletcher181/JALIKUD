import { Tabs } from 'expo-router';

export default function StaffTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="incoming-orders" options={{ title: 'Orders' }} />
      <Tabs.Screen name="sold-out" options={{ title: 'Sold Out' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}
