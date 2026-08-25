import type { ReactNode } from 'react';

export interface CardProps {
  children?: ReactNode;
  onPress?: () => void;
  padded?: boolean;
  disabled?: boolean;
}

export function Card(_props: CardProps) {
  return null;
}
