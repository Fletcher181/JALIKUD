import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { IconCheck, IconLock, IconMail, IconPhone } from '@/components/ui/icons';
import { Input, PasswordVisibilityToggle } from '@/components/ui/input';
import { AuthHeader } from '@/components/ui/logo';
import { ScreenHeader } from '@/components/ui/screen-header';
import { BrandColors } from '@/constants/theme';
import { ROUTES } from '@/constants/routes';
import {
  formatPhMobile,
  isValidEmail,
  isValidPhMobile,
  normalizePhMobileDigits,
} from '@/utils/validation';

const DUPLICATE_EMAIL = 'maria@jalikud.ph';
const DUPLICATE_PHONE = '9171234567';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  const strength = passwordStrength(password);

  const handleCreateAccount = () => {
    const nextErrors: Record<string, string> = {};
    if (!firstName.trim()) nextErrors.firstName = 'Enter your first name.';
    if (!lastName.trim()) nextErrors.lastName = 'Enter your last name.';

    const digits = normalizePhMobileDigits(mobile);
    if (!digits) {
      nextErrors.mobile = 'Enter your mobile number.';
    } else if (!isValidPhMobile(digits)) {
      nextErrors.mobile = 'Enter a valid mobile number.';
    }

    if (!email.trim()) {
      nextErrors.email = 'Enter your email address.';
    } else if (!isValidEmail(email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Create a password.';
    } else if (strength.score < 2) {
      nextErrors.password = 'Use 8+ characters with a number.';
    }
    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Re-enter your password.';
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }
    if (!agreedToTerms) {
      nextErrors.terms = 'Please agree to the terms.';
    }

    setErrors(nextErrors);
    setDuplicate(false);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const normalizedPhone = normalizePhMobileDigits(mobile);
      const isDuplicate =
        email.trim().toLowerCase() === DUPLICATE_EMAIL || normalizedPhone === DUPLICATE_PHONE;
      if (isDuplicate) {
        setDuplicate(true);
        setErrors({
          email:
            email.trim().toLowerCase() === DUPLICATE_EMAIL
              ? 'This email is already registered. Try logging in.'
              : undefined,
          mobile:
            normalizedPhone === DUPLICATE_PHONE
              ? 'This mobile number is already registered. Try logging in.'
              : undefined,
        });
        return;
      }
      router.push({
        pathname: ROUTES.auth.verifyOtp,
        params: { contact: `+63 ${digits}`, flow: 'register', name: firstName.trim() },
      });
    }, 1100);
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
        <AuthHeader title="Create your account" subtitle="It takes less than a minute." />

        {duplicate ? (
          <View style={styles.bannerSpacing}>
            <Banner tone="warning" title="Account already exists">
              Log in instead or use different details.
            </Banner>
          </View>
        ) : null}

        <View style={styles.namesRow}>
          <View style={styles.nameField}>
            <Input
              label="First Name"
              placeholder="Maria"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="given-name"
              textContentType="givenName"
              value={firstName}
              errorText={errors.firstName}
              onChangeText={(text) => {
                setFirstName(text);
                setErrors((prev) => ({ ...prev, firstName: undefined }));
              }}
            />
          </View>
          <View style={styles.nameField}>
            <Input
              label="Last Name"
              placeholder="Santos"
              autoCapitalize="words"
              autoCorrect={false}
              autoComplete="family-name"
              textContentType="familyName"
              value={lastName}
              errorText={errors.lastName}
              onChangeText={(text) => {
                setLastName(text);
                setErrors((prev) => ({ ...prev, lastName: undefined }));
              }}
            />
          </View>
        </View>

        <Input
          label="Mobile Number"
          placeholder="917 123 4567"
          keyboardType="number-pad"
          textContentType="telephoneNumber"
          autoComplete="tel-national"
          maxLength={12}
          value={mobile}
          errorText={errors.mobile}
          onChangeText={(text) => {
            setMobile(formatPhMobile(text));
            setErrors((prev) => ({ ...prev, mobile: undefined }));
          }}
          leading={
            <View style={styles.prefixRow} pointerEvents="none">
              <IconPhone size={16} color={BrandColors.muted} />
              <Text style={styles.prefix}>+63</Text>
            </View>
          }
        />

        <Input
          label="Email Address"
          placeholder="you@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          value={email}
          errorText={errors.email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          leading={<IconMail size={18} color={BrandColors.muted} />}
        />

        <Input
          label="Password"
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
          leading={<IconLock size={17} color={BrandColors.muted} />}
          trailing={
            <PasswordVisibilityToggle visible={showPassword} onPress={() => setShowPassword((visible) => !visible)} />
          }
        />
        <View
          style={[styles.strengthWrap, password.length === 0 && styles.strengthHidden]}
          pointerEvents="none"
        >
          <View style={styles.strengthTrack}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={[
                  styles.strengthSegment,
                  index < strength.score && { backgroundColor: STRENGTH_COLORS[strength.label] },
                ]}
              />
            ))}
          </View>
          <Text style={[styles.strengthLabel, { color: STRENGTH_COLORS[strength.label] }]}>
            {strength.label}
          </Text>
        </View>

        <Input
          label="Confirm Password"
          placeholder="Re-enter your password"
          secureTextEntry={!showConfirm}
          autoComplete="new-password"
          textContentType="newPassword"
          value={confirmPassword}
          errorText={errors.confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          leading={<IconLock size={17} color={BrandColors.muted} />}
          trailing={
            <PasswordVisibilityToggle visible={showConfirm} onPress={() => setShowConfirm((visible) => !visible)} />
          }
        />

        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: agreedToTerms }}
          accessibilityLabel="I agree to the Terms of Service and Privacy Policy"
          onPress={() => {
            setAgreedToTerms((checked) => !checked);
            setErrors((prev) => ({ ...prev, terms: undefined }));
          }}
          style={styles.termsRow}
        >
          <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
            {agreedToTerms ? <IconCheck size={14} color="#FFFFFF" /> : null}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.linkPrimary}>Terms of Service</Text> and{' '}
            <Text style={styles.linkPrimary}>Privacy Policy</Text>.
          </Text>
        </Pressable>
        {errors.terms ? (
          <Text style={styles.termsError} accessibilityLiveRegion="polite">
            {errors.terms}
          </Text>
        ) : null}

        <View style={styles.submitSpacing}>
          <Button
            label={loading ? 'Creating account…' : 'Create Account'}
            loading={loading}
            onPress={handleCreateAccount}
          />
        </View>

        <Pressable
          accessibilityRole="link"
          onPress={() => router.replace(ROUTES.auth.login)}
          style={({ pressed }) => [styles.footerLink, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.linkPrimary}>Log In</Text>
          </Text>
        </Pressable>

        <Text style={styles.prototypeNote}>
          Prototype: maria@jalikud.ph or +63 917 123 4567 is already registered.
        </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type StrengthLabel = 'Weak' | 'Good' | 'Strong';

function passwordStrength(value: string): { score: number; label: StrengthLabel } {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[A-Za-z]/.test(value) && value.length >= 8 && /\d/.test(value)) score += 1;
  if (score <= 1) return { score, label: 'Weak' };
  if (score === 2) return { score, label: 'Good' };
  return { score, label: 'Strong' };
}

const STRENGTH_COLORS: Record<StrengthLabel, string> = {
  Weak: BrandColors.danger,
  Good: BrandColors.accentDeep,
  Strong: BrandColors.success,
};

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
  bannerSpacing: {
    marginBottom: 16,
  },
  namesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  prefixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  prefix: {
    fontSize: 15.5,
    fontWeight: '800',
    color: BrandColors.ink,
  },
  strengthWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 4,
    height: 18,
  },
  strengthHidden: {
    opacity: 0,
  },
  strengthTrack: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  strengthSegment: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: BrandColors.border,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: '700',
    minWidth: 44,
    textAlign: 'right',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 12,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    borderColor: BrandColors.primary,
    backgroundColor: BrandColors.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 20,
    color: BrandColors.muted,
  },
  termsError: {
    marginTop: 7,
    marginLeft: 38,
    fontSize: 13,
    fontWeight: '600',
    color: BrandColors.danger,
  },
  submitSpacing: {
    marginTop: 22,
  },
  footerLink: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    marginTop: 18,
  },
  footerText: {
    fontSize: 14.5,
    color: BrandColors.muted,
    fontWeight: '500',
  },
  linkPrimary: {
    fontWeight: '700',
    color: BrandColors.primary,
  },
  prototypeNote: {
    marginTop: 22,
    textAlign: 'center',
    fontSize: 11.5,
    fontStyle: 'italic',
    color: BrandColors.muted,
    opacity: 0.75,
  },
});
