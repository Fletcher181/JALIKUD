import { create } from 'zustand';

import * as menuService from '@/services/api/menu.service';
import type { MenuCategory, MenuItem } from '@/types';

interface MenuState {
  categories: MenuCategory[];
  items: MenuItem[];
  isLoading: boolean;
  error: string | null;
  fetchMenu: () => Promise<void>;
  setAvailability: (menuItemId: string, isAvailable: boolean) => void;
}

export const useMenuStore = create<MenuState>()((set) => ({
  categories: [],
  items: [],
  isLoading: false,
  error: null,

  fetchMenu: async () => {
    set({ isLoading: true, error: null });
    try {
      const [categories, items] = await Promise.all([
        menuService.getCategories(),
        menuService.getItems(),
      ]);
      set({ categories, items, isLoading: false });
    } catch {
      set({ isLoading: false, error: 'Unable to load the menu. Please try again.' });
    }
  },

  setAvailability: (menuItemId, isAvailable) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === menuItemId ? { ...item, isAvailable } : item,
      ),
    })),
}));
