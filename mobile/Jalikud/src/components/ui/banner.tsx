import { StyleSheet, Text, View } from 'react-native';

import { IconAlert, IconCheck, IconClock } from '@/components/ui/icons';
import { BrandColors, Radius } from '@/constants/theme';

export interface BannerProps {
  tone: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  children: string;
}

export function Banner({ tone, title, children }: BannerProps) {
  const palette = BANNER_TONES[tone];
  const Icon = tone === 'success' ? IconCheck : tone === 'warning' ? IconClock : IconAlert;

  return (
    <View
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      style={[styles.banner, { backgroundColor: palette.bg, borderColor: palette.border }]}
    >
      <View style={[styles.iconWrap, { backgroundColor: palette.fg }]}>
        <Icon size={14} color="#FFFFFF" />
      </View>
      <View style={styles.textWrap}>
        {title ? <Text style={[styles.title, { color: palette.titleColor }]}>{title}</Text> : null}
        <Text style={[styles.message, { color: palette.messageColor }]}>{children}</Text>
      </View>
    </View>
  );
}

const BANNER_TONES = {
  error: {
    bg: BrandColors.dangerSoft,
    border: '#F6C6C2',
    fg: BrandColors.danger,
    titleColor: '#9B1C15',
    messageColor: '#9B1C15',
  },
  success: {
    bg: BrandColors.successSoft,
    border: '#BFE5CB',
    fg: BrandColors.success,
    titleColor: '#0B5D2E',
    messageColor: '#0B5D2E',
  },
  warning: {
    bg: BrandColors.accentSoft,
    border: '#F3D57E',
    fg: BrandColors.accentDeep,
    titleColor: '#8A6100',
    messageColor: '#8A6100',
  },
  info: {
    bg: '#EEF3FB',
    border: '#C9DAF3',
    fg: '#2563EB',
    titleColor: '#1E40AF',
    messageColor: '#1E40AF',
  },
} as const;

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    borderRadius: Radius.field,
    borderWidth: 1,
    padding: 13,
  },
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
  },
  message: {
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: '500',
  },
});
