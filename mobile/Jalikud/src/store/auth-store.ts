import { create } from 'zustand';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import type { AuthSession, LoginPayload, RegisterPayload } from '@/services/api/auth.service';
import * as authService from '@/services/api/auth.service';
import { setAuthToken } from '@/services/api/client';
import type { AuthStatus, User } from '@/types';
import { deleteStorageItem, getStorageItem, setStorageItem } from '@/utils/storage';

interface AuthState {
  status: AuthStatus;
  user: User | null;
  accessToken: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

async function persistSession(session: AuthSession): Promise<User> {
  setAuthToken(session.accessToken);
  await setStorageItem(STORAGE_KEYS.authToken, session.accessToken);
  await setStorageItem(STORAGE_KEYS.user, JSON.stringify(session.user));
  return session.user;
}

export const useAuthStore = create<AuthState>()((set) => ({
  status: 'idle',
  user: null,
  accessToken: null,

  login: async (payload) => {
    const session = await authService.login(payload);
    const user = await persistSession(session);
    set({ status: 'authenticated', user, accessToken: session.accessToken });
  },

  register: async (payload) => {
    const session = await authService.register(payload);
    const user = await persistSession(session);
    set({ status: 'authenticated', user, accessToken: session.accessToken });
  },

  logout: async () => {
    setAuthToken(null);
    await deleteStorageItem(STORAGE_KEYS.authToken);
    await deleteStorageItem(STORAGE_KEYS.user);
    set({ status: 'unauthenticated', user: null, accessToken: null });
  },

  hydrate: async () => {
    const [token, storedUser] = await Promise.all([
      getStorageItem(STORAGE_KEYS.authToken),
      getStorageItem(STORAGE_KEYS.user),
    ]);

    if (!token || !storedUser) {
      set({ status: 'unauthenticated', user: null, accessToken: null });
      return;
    }

    let user: User | null = null;
    try {
      user = JSON.parse(storedUser) as User;
    } catch {
      user = null;
    }

    if (!user) {
      setAuthToken(null);
      set({ status: 'unauthenticated', user: null, accessToken: null });
      return;
    }

    setAuthToken(token);
    set({ status: 'authenticated', user, accessToken: token });
  },
}));

export type { AuthState };
