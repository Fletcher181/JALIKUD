import { useCallback, useEffect, useRef, useState } from 'react';
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
import { router, useLocalSearchParams } from 'expo-router';

import { Banner } from '@/components/ui/banner';
import { Button } from '@/components/ui/button';
import { OtpInput } from '@/components/ui/otp-input';
import { AuthHeader } from '@/components/ui/logo';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Toast } from '@/components/ui/toast';
import { BrandColors, Radius } from '@/constants/theme';
import { ROUTES } from '@/constants/routes';

const RESEND_SECONDS = 90;
const WRONG_CODE = '000000';

export default function VerifyOtpScreen() {
  const params = useLocalSearchParams<{ contact?: string; flow?: string; name?: string }>();
  const flow = params.flow === 'reset' ? 'reset' : 'register';
  const contact = params.contact ?? '+63 917 ••• 4567';

  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState<string | undefined>();
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [verifying, setVerifying] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return undefined;
    }
    const timer = setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const expired = secondsLeft <= 0;
  const effectiveStatus = expired && status === 'idle' ? 'expired' : status;

  const submit = useCallback(
    (submittedCode: string) => {
      if (submittingRef.current) return;
      if (expired) {
        setMessage('This code has expired. Please request a new one.');
        return;
      }
      if (submittedCode.length < 6) {
        setStatus('error');
        setMessage('Enter the complete 6-digit code.');
        return;
      }
      if (submittedCode === WRONG_CODE) {
        setStatus('error');
        setMessage("That code is incorrect. Double-check the SMS and try again.");
        setTimeout(() => {
          setCode('');
          setStatus('idle');
        }, 700);
        return;
      }

      submittingRef.current = true;
      setVerifying(true);
      setMessage(undefined);
      setTimeout(() => {
        setVerifying(false);
        setStatus('success');
        setTimeout(() => {
          if (flow === 'register') {
            router.push({
              pathname: ROUTES.auth.registerSuccess,
              params: { name: params.name ?? '' },
            });
          } else {
            router.push({ pathname: ROUTES.auth.resetPassword, params: { contact } });
          }
        }, 450);
      }, 900);
    },
    [contact, expired, flow, params.name],
  );

  const handleResend = () => {
    setCode('');
    setStatus('idle');
    setMessage(undefined);
    setSecondsLeft(RESEND_SECONDS);
    setToast(`A new code was sent to ${contact}.`);
  };

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(1, '0');
  const seconds = String(secondsLeft % 60).padStart(2, '0');

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
          title="Verify your number"
          subtitle={`Enter the 6-digit code we sent via SMS to ${contact}.`}
        />

        <OtpInput
          value={code}
          onChange={(next) => {
            setCode(next);
            if (status !== 'idle') {
              setStatus('idle');
              setMessage(undefined);
            }
            if (next.length === 6) {
              submit(next);
            }
          }}
          status={effectiveStatus}
          editable={!verifying && status !== 'success'}
        />

        {(effectiveStatus === 'error' || effectiveStatus === 'expired') && message ? (
          <View style={styles.messageSpacing}>
            <Text style={styles.errorMessage}>{message}</Text>
          </View>
        ) : effectiveStatus === 'success' ? (
          <Text style={[styles.successMessage, styles.messageSpacing]}>Verified! Setting things up…</Text>
        ) : null}

        {expired ? (
          <View style={styles.bannerSpacing}>
            <Banner tone="warning" title="Code expired">
              Your verification code has expired for security. Request a fresh one — it only takes a moment.
            </Banner>
          </View>
        ) : (
          <Text style={styles.timer}>
            Resend code in{' '}
            <Text style={styles.timerValue}>
              {minutes}:{seconds}
            </Text>
          </Text>
        )}

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: !expired }}
          onPress={() => {
            if (expired) handleResend();
          }}
          style={({ pressed }) => [
            styles.resendLink,
            !expired && styles.resendDisabled,
            pressed && expired && { opacity: 0.6 },
          ]}
        >
          <Text style={[styles.linkPrimary, !expired && styles.mutedLink]}>Resend Code</Text>
        </Pressable>

        <Pressable
          accessibilityRole="link"
          onPress={() => router.back()}
          style={({ pressed }) => [styles.changeNumber, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.footerText}>
            Wrong number? <Text style={styles.linkPrimary}>Change Phone Number</Text>
          </Text>
        </Pressable>

        <View style={styles.submitSpacing}>
          <Button
            label={verifying ? 'Verifying…' : 'Verify'}
            loading={verifying}
            onPress={() => submit(code)}
          />
        </View>

        <Text style={styles.prototypeNote}>
          Prototype only: any 6-digit code verifies; enter 000000 to see the incorrect-code state, or let
          the timer run out for the expired state.
        </Text>
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
  bannerSpacing: {
    marginTop: 18,
  },
  messageSpacing: {
    marginTop: 14,
  },
  errorMessage: {
    fontSize: 13.5,
    fontWeight: '600',
    color: BrandColors.danger,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 13.5,
    fontWeight: '700',
    color: BrandColors.success,
    textAlign: 'center',
  },
  timer: {
    marginTop: 22,
    textAlign: 'center',
    fontSize: 14,
    color: BrandColors.muted,
    fontWeight: '500',
  },
  timerValue: {
    fontWeight: '800',
    color: BrandColors.primary,
  },
  resendLink: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 2,
    borderRadius: Radius.field,
  },
  resendDisabled: {
    opacity: 0.55,
  },
  linkPrimary: {
    fontSize: 14.5,
    fontWeight: '800',
    color: BrandColors.primary,
  },
  mutedLink: {
    color: BrandColors.muted,
  },
  changeNumber: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    marginTop: 4,
  },
  footerText: {
    fontSize: 14,
    color: BrandColors.muted,
    fontWeight: '500',
  },
  submitSpacing: {
    marginTop: 26,
  },
  prototypeNote: {
    marginTop: 28,
    textAlign: 'center',
    fontSize: 11.5,
    fontStyle: 'italic',
    color: BrandColors.muted,
    opacity: 0.75,
  },
});
