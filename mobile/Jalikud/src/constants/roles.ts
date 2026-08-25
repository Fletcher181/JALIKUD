import type { UserRole } from '@/types';

export const USER_ROLES = ['customer', 'staff'] as const satisfies readonly UserRole[];

export const DEFAULT_ROLE: UserRole = 'customer';
