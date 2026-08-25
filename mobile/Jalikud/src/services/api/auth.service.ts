import type { User } from '@/types';
import { apiGet, apiPost } from './client';
import { ENDPOINTS } from './endpoints';
import type {
  AuthSession,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
} from './auth.types';

export type { AuthSession, ForgotPasswordPayload, LoginPayload, RegisterPayload };

export async function login(payload: LoginPayload): Promise<AuthSession> {
  return apiPost<AuthSession>(ENDPOINTS.auth.login, payload);
}

export async function register(payload: RegisterPayload): Promise<AuthSession> {
  return apiPost<AuthSession>(ENDPOINTS.auth.register, payload);
}

export async function forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
  await apiPost<void>(ENDPOINTS.auth.forgotPassword, payload);
}

export async function getMe(): Promise<User> {
  return apiGet<User>(ENDPOINTS.auth.me);
}
