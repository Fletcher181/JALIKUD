import type { MenuItem } from '@/types';

export interface MenuItemCardProps {
  item: MenuItem;
  onPress?: (item: MenuItem) => void;
  quantityInCart?: number;
}

export function MenuItemCard(_props: MenuItemCardProps) {
  return null;
}
