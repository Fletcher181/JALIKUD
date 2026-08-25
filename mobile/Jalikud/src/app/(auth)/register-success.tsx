import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';

import { Button } from '@/components/ui/button';
import { IconCheck } from '@/components/ui/icons';
import { BrandColors } from '@/constants/theme';
import { ROUTES } from '@/constants/routes';

export default function RegisterSuccessScreen() {
  const params = useLocalSearchParams<{ name?: string }>();
  const firstName = params.name ? params.name.split(' ')[0] : '';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.confettiRow}>
          <View style={[styles.dot, styles.dotYellow]} />
          <View style={[styles.dot, styles.dotRed]} />
          <View style={[styles.dot, styles.dotYellowSmall]} />
        </View>

        <View style={styles.checkCircleOuter}>
          <View style={styles.checkCircleInner}>
            <IconCheck size={38} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.title}>Account created!</Text>
        <Text style={styles.subtitle}>
          Welcome to Jalikud{firstName ? `, ${firstName}` : ''}. Your account is verified and ready —
          log in to start ordering your favorites.
        </Text>

        <View style={styles.buttonSpacing}>
          <Button label="Continue to Log In" onPress={() => router.replace(ROUTES.auth.login)} />
        </View>

        <Pressable
          accessibilityRole="link"
          onPress={() => router.replace(ROUTES.auth.login)}
          style={({ pressed }) => [styles.footerLink, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.footerText}>
            Didn&apos;t mean to sign up? <Text style={styles.linkPrimary}>Go back</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BrandColors.surface,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  confettiRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 26,
  },
  dot: {
    borderRadius: 999,
  },
  dotYellow: {
    width: 12,
    height: 12,
    backgroundColor: BrandColors.accent,
  },
  dotRed: {
    width: 9,
    height: 9,
    backgroundColor: BrandColors.primary,
    marginTop: 10,
  },
  dotYellowSmall: {
    width: 7,
    height: 7,
    backgroundColor: BrandColors.accentDeep,
    marginTop: -6,
  },
  checkCircleOuter: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: BrandColors.successSoft,
    borderWidth: 2,
    borderColor: '#BFE5CB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
  },
  checkCircleInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: BrandColors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: BrandColors.ink,
    letterSpacing: -0.4,
  },
  subtitle: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 23,
    color: BrandColors.muted,
  },
  buttonSpacing: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  footerLink: {
    minHeight: 44,
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    color: BrandColors.muted,
    fontWeight: '500',
  },
  linkPrimary: {
    fontWeight: '700',
    color: BrandColors.primary,
  },
});
