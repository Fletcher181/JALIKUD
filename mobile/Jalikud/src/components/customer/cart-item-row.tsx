import type { CartItem } from '@/types';

export interface CartItemRowProps {
  item: CartItem;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
}

export function CartItemRow(_props: CartItemRowProps) {
  return null;
}
