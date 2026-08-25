import { useRef, useState, type ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { IconAlert, IconEye, IconEyeOff } from '@/components/ui/icons';
import { BrandColors, Radius } from '@/constants/theme';

export interface InputProps extends TextInputProps {
  label?: string;
  errorText?: string;
  hint?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}

export function Input({
  label,
  errorText,
  hint,
  leading,
  trailing,
  style,
  accessibilityLabel,
  editable = true,
  ...textInputProps
}: InputProps) {
  const inputRef = useRef<TextInput | null>(null);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable
        accessibilityState={{ disabled: !editable }}
        onPress={() => {
          if (editable) inputRef.current?.focus();
        }}
        style={({ pressed }) => [
          styles.box,
          focused && !errorText && styles.boxFocused,
          !!errorText && styles.boxError,
          !editable && styles.boxDisabled,
          pressed && editable && !focused && styles.boxPressed,
        ]}
      >
        {leading ? (
          <View pointerEvents="none" style={styles.leading}>
            {leading}
          </View>
        ) : null}
        <TextInput
          {...textInputProps}
          ref={(node) => {
            inputRef.current = node;
          }}
          editable={editable}
          accessibilityLabel={accessibilityLabel ?? label}
          aria-describedby={errorText ? `${label ?? 'input'}-error` : undefined}
          style={[styles.input, style]}
          placeholderTextColor={BrandColors.muted}
          onFocus={(event) => {
            setFocused(true);
            textInputProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            textInputProps.onBlur?.(event);
          }}
        />
        {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
      </Pressable>
      {errorText ? (
        <View style={styles.errorRow} pointerEvents="none">
          <IconAlert size={13} color={BrandColors.danger} />
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
}

export function PasswordVisibilityToggle({ visible, onPress }: { visible: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={visible ? 'Hide password' : 'Show password'}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [styles.eyeButton, pressed && { opacity: 0.55 }]}
    >
      {visible ? <IconEyeOff size={22} /> : <IconEye size={22} />}
    </Pressable>
  );
}

const FIELD_HEIGHT = 56;

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  label: {
    fontSize: 13.5,
    fontWeight: '700',
    color: BrandColors.ink,
    marginBottom: 7,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    height: FIELD_HEIGHT,
    borderRadius: Radius.field,
    borderWidth: 1.5,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surface,
    paddingHorizontal: 16,
  },
  boxFocused: {
    borderColor: BrandColors.primary,
    ...(Platform.OS === 'ios'
      ? {
          shadowColor: BrandColors.accent,
          shadowOpacity: 0.5,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 0 },
        }
      : {}),
  },
  boxPressed: {
    borderColor: '#C9CDD4',
  },
  boxError: {
    borderColor: BrandColors.danger,
    backgroundColor: '#FFFBFA',
  },
  boxDisabled: {
    backgroundColor: BrandColors.backdrop,
    opacity: 0.7,
  },
  leading: {
    marginRight: 12,
    paddingRight: 12,
    borderRightWidth: 1.5,
    borderRightColor: BrandColors.border,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: BrandColors.ink,
    paddingVertical: 0,
    textAlignVertical: 'center',
    minHeight: FIELD_HEIGHT - 4,
  },
  trailing: {
    marginLeft: 10,
  },
  eyeButton: {
    minHeight: 44,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 7,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: BrandColors.danger,
  },
  hintText: {
    marginTop: 7,
    fontSize: 12.5,
    color: BrandColors.muted,
  },
});
