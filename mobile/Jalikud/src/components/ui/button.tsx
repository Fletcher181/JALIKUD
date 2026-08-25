import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { BrandColors, Radius } from '@/constants/theme';

export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  fullWidth = true,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const height = size === 'small' ? 42 : size === 'medium' ? 48 : 54;
  const fontSize = size === 'small' ? 14 : size === 'medium' ? 15 : 16;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      accessibilityLabel={label}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          borderRadius: size === 'large' ? Radius.button : Radius.field,
          opacity: isDisabled ? 0.55 : pressed ? 0.85 : 1,
        },
        variant === 'primary' && { backgroundColor: BrandColors.primary },
        variant === 'secondary' && {
          backgroundColor: BrandColors.surface,
          borderWidth: 1.5,
          borderColor: BrandColors.border,
        },
        variant === 'danger' && { backgroundColor: BrandColors.danger },
        fullWidth ? { width: '100%' } : { alignSelf: 'flex-start' },
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'secondary' ? BrandColors.primary : '#FFFFFF'}
        />
      ) : null}
      <Text style={[styles.label, { fontSize }, variant === 'secondary' && { color: BrandColors.ink }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  label: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
