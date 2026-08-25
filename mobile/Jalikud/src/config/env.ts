export const ENV = {
  appName: 'Jalikud',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api',
} as const;
