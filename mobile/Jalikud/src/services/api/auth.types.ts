import type { User, UserRole } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken?: string;
}
