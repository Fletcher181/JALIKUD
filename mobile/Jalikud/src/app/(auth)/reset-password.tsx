import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';

import { Button } from '@/components/ui/button';
import { IconCheck } from '@/components/ui/icons';
import { Input, PasswordVisibilityToggle } from '@/components/ui/input';
import { AuthHeader } from '@/components/ui/logo';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Toast } from '@/components/ui/toast';
import { BrandColors, Radius } from '@/constants/theme';
import { ROUTES } from '@/constants/routes';

export default function ResetPasswordScreen() {
  const params = useLocalSearchParams<{ contact?: string }>();
  const contact = params.contact ?? 'your account';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const rules = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Both passwords match', met: confirmPassword.length > 0 && password === confirmPassword },
  ];

  const handleReset = () => {
    const nextErrors: { password?: string; confirm?: string } = {};
    if (!password) {
      nextErrors.password = 'Enter your new password.';
    } else if (password.length < 8 || !/\d/.test(password)) {
      nextErrors.password = 'Use at least 8 characters with a number.';
    }
    if (!confirmPassword) {
      nextErrors.confirm = 'Re-enter your new password.';
    } else if (confirmPassword !== password) {
      nextErrors.confirm = 'Passwords do not match.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast('Password updated. Please log in.');
      setTimeout(() => router.replace(ROUTES.auth.login), 1200);
    }, 1000);
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
          title="Set a new password"
          subtitle={`Create a fresh password for ${contact}. You'll use it next time you log in.`}
        />

        <View style={styles.rulesCard}>
          {rules.map((rule) => (
            <View key={rule.label} style={styles.ruleRow}>
              <View style={[styles.ruleDot, rule.met && styles.ruleDotMet]}>
                {rule.met ? <IconCheck size={11} color="#FFFFFF" /> : null}
              </View>
              <Text style={[styles.ruleText, rule.met && styles.ruleTextMet]}>{rule.label}</Text>
            </View>
          ))}
        </View>

        <Input
          label="New Password"
          placeholder="At least 8 characters"
          secureTextEntry={!showPassword}
          autoComplete="new-password"
          textContentType="newPassword"
          value={password}
          errorText={errors.password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          trailing={
            <PasswordVisibilityToggle visible={showPassword} onPress={() => setShowPassword((visible) => !visible)} />
          }
        />
        <Input
          label="Confirm New Password"
          placeholder="Re-enter your new password"
          secureTextEntry={!showConfirm}
          autoComplete="new-password"
          textContentType="newPassword"
          value={confirmPassword}
          errorText={errors.confirm}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrors((prev) => ({ ...prev, confirm: undefined }));
          }}
          trailing={
            <PasswordVisibilityToggle visible={showConfirm} onPress={() => setShowConfirm((visible) => !visible)} />
          }
        />

        <View style={styles.submitSpacing}>
          <Button
            label={loading ? 'Updating…' : 'Reset Password'}
            loading={loading}
            onPress={handleReset}
          />
        </View>
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
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  rulesCard: {
    backgroundColor: BrandColors.accentSoft,
    borderRadius: Radius.field,
    borderWidth: 1,
    borderColor: '#F3DFA0',
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 9,
    marginBottom: 20,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ruleDot: {
    width: 19,
    height: 19,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#D9C27A',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BrandColors.surface,
  },
  ruleDotMet: {
    borderColor: BrandColors.success,
    backgroundColor: BrandColors.success,
  },
  ruleText: {
    fontSize: 13.5,
    fontWeight: '600',
    color: BrandColors.muted,
  },
  ruleTextMet: {
    color: BrandColors.success,
  },
  submitSpacing: {
    marginTop: 24,
    gap: 14,
  },
});
