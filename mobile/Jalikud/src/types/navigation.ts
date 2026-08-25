export type AuthStatus = 'idle' | 'authenticated' | 'unauthenticated';

export interface MenuCategoryParams {
  category: string;
}

export interface MenuItemParams {
  id: string;
}

export interface OrderDetailsParams {
  id: string;
}
