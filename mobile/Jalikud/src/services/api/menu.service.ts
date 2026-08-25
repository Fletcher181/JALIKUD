import type { MenuCategory, MenuItem } from '@/types';
import { apiGet, apiPatch } from './client';
import { ENDPOINTS } from './endpoints';

export async function getCategories(): Promise<MenuCategory[]> {
  return apiGet<MenuCategory[]>(ENDPOINTS.menu.categories);
}

export async function getItems(categoryId?: string): Promise<MenuItem[]> {
  return apiGet<MenuItem[]>(ENDPOINTS.menu.items, categoryId ? { categoryId } : undefined);
}

export async function getItem(id: string): Promise<MenuItem> {
  return apiGet<MenuItem>(ENDPOINTS.menu.item(id));
}

export async function updateAvailability(id: string, isAvailable: boolean): Promise<void> {
  await apiPatch<void>(ENDPOINTS.menu.availability(id), { isAvailable });
}
