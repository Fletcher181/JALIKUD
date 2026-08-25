import { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

import { IconCheck } from '@/components/ui/icons';
import { BrandColors } from '@/constants/theme';

export interface ToastProps {
  message: string;
  visible: boolean;
  onHide?: () => void;
  duration?: number;
}

export function Toast({ message, visible, onHide, duration = 2600 }: ToastProps) {
  const translateY = useMemo(() => new Animated.Value(-24), []);
  const opacity = useMemo(() => new Animated.Value(0), []);
  const hideRef = useRef(onHide);

  useEffect(() => {
    hideRef.current = onHide;
  }, [onHide]);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, { toValue: -24, duration: 200, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start(() => {
        hideRef.current?.();
      });
    }, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, opacity, translateY]);

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      style={[styles.toast, { opacity, transform: [{ translateY }] }]}
      pointerEvents="none"
    >
      <IconCheck size={15} color={BrandColors.accent} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: '#23262D',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 12,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    maxWidth: '92%',
  },
  message: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '600',
  },
});
