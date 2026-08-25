import { useCartStore } from '@/store/cart-store';

export function useCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clear = useCartStore((state) => state.clear);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.menuItem.price,
    0,
  );

  return {
    items,
    totalCount,
    totalAmount,
    addItem,
    removeItem,
    updateQuantity,
    clear,
  };
}
