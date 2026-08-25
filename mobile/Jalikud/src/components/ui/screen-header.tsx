import { Pressable, StyleSheet, View } from 'react-native';

import { IconBack } from '@/components/ui/icons';
import { BrandColors } from '@/constants/theme';

export function ScreenHeader({ onBack, right }: { onBack?: () => void; right?: React.ReactNode }) {
  return (
    <View style={styles.row}>
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={onBack}
          hitSlop={6}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.6 }]}
        >
          <IconBack size={20} />
        </Pressable>
      ) : null}
      <View style={styles.spacer} />
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    marginTop: 4,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: BrandColors.border,
    backgroundColor: BrandColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    flex: 1,
  },
});
