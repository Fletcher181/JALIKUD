import { create } from 'zustand';

import type { CartItem, MenuItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (menuItem: MenuItem, quantity?: number) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],

  addItem: (menuItem, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((item) => item.menuItem.id === menuItem.id);
      if (!existing) {
        return { items: [...state.items, { menuItem, quantity }] };
      }
      return {
        items: state.items.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      };
    }),

  removeItem: (menuItemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.menuItem.id !== menuItemId),
    })),

  updateQuantity: (menuItemId, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((item) => item.menuItem.id !== menuItemId)
          : state.items.map((item) =>
              item.menuItem.id === menuItemId ? { ...item, quantity } : item,
            ),
    })),

  clear: () => set({ items: [] }),
}));
