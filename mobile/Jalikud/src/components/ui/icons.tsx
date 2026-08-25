import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { BrandColors } from '@/constants/theme';

export interface IconProps {
  size?: number;
  color?: string;
}

function Bar({
  width,
  height,
  color,
  radius = 2,
  rotation,
  style,
}: {
  width: number;
  height: number;
  color: string;
  radius?: number;
  rotation?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        styles.bar,
        { width, height, borderRadius: radius, backgroundColor: color },
        rotation !== undefined && { transform: [{ rotate: `${rotation}deg` }] },
        style,
      ]}
    />
  );
}

export function IconBack({ size = 22, color = BrandColors.ink }: IconProps) {
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View
        style={{
          width: size - 4,
          height: 2,
          borderRadius: 1,
          backgroundColor: color,
          position: 'absolute',
          left: 1,
        }}
      />
      <Bar width={size * 0.34} height={2} color={color} rotation={-45} style={{ left: 0, top: size / 2 - size * 0.12 - 1 }} />
      <Bar width={size * 0.34} height={2} color={color} rotation={45} style={{ left: 0, top: size / 2 + size * 0.12 - 1 }} />
    </View>
  );
}

export function IconEye({ size = 22, color = BrandColors.muted }: IconProps) {
  const w = size;
  const h = size * 0.62;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View
        style={{
          width: w,
          height: h,
          borderRadius: h / 2,
          borderWidth: 2,
          borderColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.3,
          height: size * 0.3,
          borderRadius: size * 0.15,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

export function IconEyeOff({ size = 22, color = BrandColors.muted }: IconProps) {
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={{ opacity: 0.45 }}>
        <IconEye size={size} color={color} />
      </View>
      <View
        style={{
          position: 'absolute',
          width: 2,
          height: size * 1.15,
          borderRadius: 1,
          backgroundColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}

export function IconCheck({ size = 16, color = '#FFFFFF' }: IconProps) {
  const t = Math.max(2, size * 0.14);
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Bar
        width={t}
        height={size * 0.42}
        color={color}
        radius={t / 2}
        rotation={-45}
        style={{ left: size * 0.08, top: size * 0.4 }}
      />
      <Bar
        width={t}
        height={size * 0.72}
        color={color}
        radius={t / 2}
        rotation={40}
        style={{ right: size * 0.18, top: size * 0.06 }}
      />
    </View>
  );
}

export function IconAlert({ size = 16, color = '#FFFFFF' }: IconProps) {
  const t = Math.max(2, size * 0.13);
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Bar width={t} height={size * 0.42} color={color} radius={t / 2} style={{ top: size * 0.08 }} />
      <Bar width={t} height={t} color={color} radius={t / 2} style={{ bottom: size * 0.1 }} />
    </View>
  );
}

export function IconClock({ size = 16, color = '#FFFFFF' }: IconProps) {
  const t = Math.max(2, size * 0.11);
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <Bar width={t} height={size * 0.28} color={color} radius={t / 2} style={{ left: size / 2 - t / 2, top: size * 0.2 }} />
      <Bar width={size * 0.24} height={t} color={color} radius={t / 2} style={{ left: size * 0.5, top: size * 0.46 }} />
    </View>
  );
}

export function IconMail({ size = 20, color = BrandColors.muted }: IconProps) {
  const w = size;
  const h = size * 0.72;
  const flapW = w * 0.38;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={{ width: w, height: h, borderRadius: 5, borderWidth: 2, borderColor: color }} />
      <Bar width={flapW} height={2} color={color} rotation={-24} style={{ left: w * 0.5 - flapW, top: h * 0.32 }} />
      <Bar width={flapW} height={2} color={color} rotation={24} style={{ left: w * 0.5, top: h * 0.32 }} />
    </View>
  );
}

export function IconLock({ size = 20, color = BrandColors.muted }: IconProps) {
  const bodyW = size * 0.78;
  const bodyH = size * 0.52;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: size * 0.44,
          height: size * 0.56,
          borderWidth: 2,
          borderBottomWidth: 0,
          borderTopLeftRadius: size * 0.24,
          borderTopRightRadius: size * 0.24,
          borderColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: bodyW,
          height: bodyH,
          borderRadius: 4,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

export function IconUser({ size = 20, color = BrandColors.muted }: IconProps) {
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: size * 0.36,
          height: size * 0.36,
          borderRadius: size * 0.18,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: size * 0.62,
          height: size * 0.34,
          borderTopLeftRadius: size * 0.31,
          borderTopRightRadius: size * 0.31,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

export function IconPhone({ size = 20, color = BrandColors.muted }: IconProps) {
  const w = size * 0.58;
  const h = size;
  return (
    <View style={[styles.center, { width: size, height: size }]}>
      <View style={{ width: w, height: h, borderRadius: 4, borderWidth: 2, borderColor: color }} />
      <View
        style={{
          position: 'absolute',
          bottom: size * 0.14,
          width: 3,
          height: 3,
          borderRadius: 1.5,
          backgroundColor: color,
        }}
      />
    </View>
  );
}

export function IconGoogle({ size = 20 }: { size?: number }) {
  return (
    <View
      style={[
        styles.center,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: '#FFFFFF',
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: BrandColors.border,
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.66, fontWeight: '800', color: '#4285F4', lineHeight: size * 0.8 }}>G</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    position: 'absolute',
  },
});
