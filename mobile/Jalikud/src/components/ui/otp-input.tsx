import { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, TextInput } from 'react-native';

import { BrandColors, Radius } from '@/constants/theme';

export interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  status?: 'idle' | 'error' | 'expired' | 'success';
  editable?: boolean;
}

export function OtpInput({ value, onChange, length = 6, status = 'idle', editable = true }: OtpInputProps) {
  const refs = useRef<(TextInput | null)[]>([]);
  const shake = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    if (status === 'error') {
      Animated.sequence([
        Animated.timing(shake, { toValue: 7, duration: 55, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -7, duration: 55, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 5, duration: 55, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 55, useNativeDriver: true }),
      ]).start();
    }
  }, [status, shake]);

  const digits = Array.from({ length }, (_, index) => value[index] ?? '');

  const handleChange = (index: number, text: string) => {
    const pasted = text.replace(/\D/g, '');
    if (!pastable(pasted)) return;

    if (pasted.length > 1) {
      const next = (value.slice(0, index) + pasted).slice(0, length);
      onChange(next);
      focusAt(Math.min(next.length, length - 1));
      return;
    }

    const chars = digits.slice();
    chars[index] = pasted;
    const next = chars.join('').slice(0, length);
    onChange(next);
    if (pasted && index < length - 1) {
      focusAt(index + 1);
    }
  };

  const handleBackspace = (index: number) => {
    if (!digits[index] && index > 0) {
      const chars = digits.slice();
      chars[index - 1] = '';
      onChange(chars.join(''));
      focusAt(index - 1);
    }
  };

  const focusAt = (index: number) => {
    refs.current[index]?.focus();
  };

  return (
    <Animated.View style={[styles.row, { transform: [{ translateX: shake }] }]}>
      {digits.map((digit, index) => (
        <TextInput
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          accessibilityLabel={`Digit ${index + 1} of ${length}`}
          value={digit}
          onChangeText={(text) => handleChange(index, text)}
          onKeyPress={(event) => {
            if (event.nativeEvent.key === 'Backspace') handleBackspace(index);
          }}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={length}
          editable={editable && status !== 'expired'}
          style={[
            styles.box,
            digit ? styles.boxFilled : null,
            status === 'error' && styles.boxError,
            status === 'success' && styles.boxSuccess,
            status === 'expired' && styles.boxExpired,
          ]}
        />
      ))}
    </Animated.View>
  );
}

function pastable(text: string) {
  return /^[\d]*$/.test(text);
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  box: {
    flex: 1,
    height: 58,
    borderRadius: Radius.field,
    borderWidth: 1.5,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surface,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '800',
    color: BrandColors.ink,
  },
  boxFilled: {
    borderColor: BrandColors.ink,
  },
  boxError: {
    borderColor: BrandColors.danger,
    backgroundColor: '#FFFBFA',
    color: BrandColors.danger,
  },
  boxSuccess: {
    borderColor: BrandColors.success,
    backgroundColor: BrandColors.successSoft,
  },
  boxExpired: {
    opacity: 0.45,
  },
});
