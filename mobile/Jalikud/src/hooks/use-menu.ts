import { useMenuStore } from '@/store/menu-store';
import type { MenuCategory, MenuItem } from '@/types';

export function useMenu() {
  const categories = useMenuStore((state) => state.categories);
  const items = useMenuStore((state) => state.items);
  const isLoading = useMenuStore((state) => state.isLoading);
  const error = useMenuStore((state) => state.error);
  const fetchMenu = useMenuStore((state) => state.fetchMenu);
  const setAvailability = useMenuStore((state) => state.setAvailability);

  function getItemsByCategory(categoryId: string): MenuItem[] {
    return items.filter((item) => item.categoryId === categoryId);
  }

  function getCategoryById(categoryId: string): MenuCategory | undefined {
    return categories.find((category) => category.id === categoryId);
  }

  function getItemById(itemId: string): MenuItem | undefined {
    return items.find((item) => item.id === itemId);
  }

  return {
    categories,
    items,
    isLoading,
    error,
    fetchMenu,
    setAvailability,
    getItemsByCategory,
    getCategoryById,
    getItemById,
  };
}
