import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { IconGoogle, IconLock, IconMail } from '@/components/ui/icons';
import { Input, PasswordVisibilityToggle } from '@/components/ui/input';
import { AuthHeader, LogoMark, LogoWordmark } from '@/components/ui/logo';
import { Toast } from '@/components/ui/toast';
import { BrandColors } from '@/constants/theme';
import { ROUTES } from '@/constants/routes';
import { formatIdentifierInput, isValidIdentifier } from '@/utils/validation';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [identifierError, setIdentifierError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [credentialsError, setCredentialsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const attemptRef = useRef(0);
  const [toast, setToast] = useState<string | null>(null);

  const handleLogin = () => {
    const idValid = isValidIdentifier(identifier);
    if (!identifier.trim()) {
      setIdentifierError('Enter your email or mobile number.');
    } else if (!idValid) {
      setIdentifierError('Enter a valid email or mobile number.');
    }
    if (!password) {
      setPasswordError('Enter your password.');
      return;
    }
    if (!idValid && identifier.trim()) return;

    setLoading(true);
    setCredentialsError(false);

    setTimeout(() => {
      setLoading(false);
      attemptRef.current += 1;
      if (attemptRef.current % 2 === 1) {
        setCredentialsError(true);
        setPasswordError('Incorrect email or password.');
        return;
      }
      setPasswordError(undefined);
      setToast('Logged in. End of prototype flow.');
    }, 900);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
        <View style={styles.brandRow}>
          <LogoMark size={58} />
          <LogoWordmark size={24} />
        </View>

        <AuthHeader title="Welcome back" />

        {credentialsError ? (
          <View style={styles.bannerSpacing}>
            <Banner tone="error" title="Login failed">
              Incorrect email or password.
            </Banner>
          </View>
        ) : null}

        <View style={styles.formGap}>
          <Input
            label="Email or phone number"
            placeholder="you@email.com or 0917 123 4567"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="username"
            textContentType="username"
            value={identifier}
            errorText={identifierError}
            onChangeText={(text) => {
              setIdentifier(formatIdentifierInput(text));
              setIdentifierError(undefined);
              setCredentialsError(false);
            }}
            leading={<IconMail size={19} color={BrandColors.muted} />}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            autoComplete="password"
            textContentType="password"
            value={password}
            errorText={passwordError}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(undefined);
              setCredentialsError(false);
            }}
            leading={<IconLock size={18} color={BrandColors.muted} />}
            trailing={
              <PasswordVisibilityToggle visible={showPassword} onPress={() => setShowPassword((visible) => !visible)} />
            }
          />
        </View>

        <Pressable
          accessibilityRole="link"
          onPress={() => router.push(ROUTES.auth.forgotPassword)}
          style={({ pressed }) => [styles.forgotLink, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.linkPrimary}>Forgot Password?</Text>
        </Pressable>

        <Button label={loading ? 'Logging in…' : 'Log In'} loading={loading} onPress={handleLogin} />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View>
          <Button
            label="Continue with Google"
            variant="secondary"
            loading={false}
            onPress={() => setToast('Google sign-in is not part of this prototype.')}
          />
          <View pointerEvents="none" style={styles.googleIconOverlay}>
            <IconGoogle size={20} />
          </View>
        </View>

        <Pressable
          accessibilityRole="link"
          onPress={() => router.push(ROUTES.auth.register)}
          style={({ pressed }) => [styles.footerLink, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.footerText}>
            Don&apos;t have an account? <Text style={styles.linkPrimary}>Create Account</Text>
          </Text>
        </Pressable>

        <Text style={styles.prototypeNote}>Prototype: the first log-in attempt fails, the next succeeds.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast message={toast ?? ''} visible={toast !== null} onHide={() => setToast(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BrandColors.surface,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 28,
    marginBottom: 30,
  },
  bannerSpacing: {
    marginBottom: 16,
  },
  formGap: {
    gap: 14,
    marginBottom: 6,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    minHeight: 44,
    justifyContent: 'center',
    marginBottom: 10,
  },
  linkPrimary: {
    fontSize: 14.5,
    fontWeight: '700',
    color: BrandColors.primary,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: BrandColors.border,
  },
  dividerText: {
    fontSize: 13,
    fontWeight: '600',
    color: BrandColors.muted,
  },
  googleIconOverlay: {
    position: 'absolute',
    left: 24,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  footerLink: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    marginTop: 22,
  },
  footerText: {
    fontSize: 14.5,
    color: BrandColors.muted,
    fontWeight: '500',
  },
  prototypeNote: {
    marginTop: 26,
    textAlign: 'center',
    fontSize: 11.5,
    fontStyle: 'italic',
    color: BrandColors.muted,
    opacity: 0.75,
  },
});
