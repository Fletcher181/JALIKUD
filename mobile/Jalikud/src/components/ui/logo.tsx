import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import { BrandColors } from '@/constants/theme';

export function LogoMark({ size = 64 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        overflow: 'hidden',
        backgroundColor: BrandColors.primary,
      }}
    >
      <Image
        source={require('@/assets/images/logo.png')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        accessibilityLabel="Jalikud logo"
      />
    </View>
  );
}

export function LogoWordmark({ size = 24 }: { size?: number }) {
  return (
    <Text
      style={{
        fontSize: size,
        fontWeight: '800',
        color: BrandColors.ink,
        letterSpacing: -0.5,
      }}
    >
      Jalikud<Text style={{ color: BrandColors.primary }}>.</Text>
    </Text>
  );
}

export function AuthHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '800',
    color: BrandColors.ink,
    letterSpacing: -0.4,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    color: BrandColors.muted,
  },
});
