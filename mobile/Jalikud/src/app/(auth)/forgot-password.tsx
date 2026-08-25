import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { Button } from '@/components/ui/button';
import { IconMail, IconPhone } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { AuthHeader } from '@/components/ui/logo';
import { ScreenHeader } from '@/components/ui/screen-header';
import { BrandColors } from '@/constants/theme';
import { ROUTES } from '@/constants/routes';
import { formatIdentifierInput, isValidIdentifier, maskContact } from '@/utils/validation';

export default function ForgotPasswordScreen() {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    if (!identifier.trim()) {
      setError('Enter the email or mobile number on your account.');
      return;
    }
    if (!isValidIdentifier(identifier)) {
      setError('Enter a valid email address or PH mobile number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: ROUTES.auth.verifyOtp,
        params: {
          contact: maskContact(identifier.trim()),
          flow: 'reset',
        },
      });
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
        <ScreenHeader onBack={() => router.back()} />
        <AuthHeader
          title="Forgot password?"
          subtitle="Enter the email or mobile number linked to your account and we'll send you a 6-digit reset code."
        />

        <Input
          label="Email or phone number"
          placeholder="you@email.com or 0917 123 4567"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="username"
          textContentType="username"
          value={identifier}
          errorText={error}
          onChangeText={(text) => {
            setIdentifier(formatIdentifierInput(text));
            setError(undefined);
          }}
          leading={
            identifier.includes('@') ? (
              <IconMail size={18} color={BrandColors.muted} />
            ) : (
              <IconPhone size={17} color={BrandColors.muted} />
            )
          }
        />

        <View style={styles.submitSpacing}>
          <Button
            label={loading ? 'Sending code…' : 'Send Reset Code'}
            loading={loading}
            onPress={handleSendCode}
          />
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  submitSpacing: {
    marginTop: 24,
  },
});
